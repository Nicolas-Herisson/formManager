import React, { useEffect, useState } from 'react';
import type { Form, Question, AnswerMap, AnswerValue } from '@/types/types';
import { fetchGetForm } from '@/services/formRequests';
import { fetchUpdateResponse } from '@/services/responseRequests';
import { useParams } from 'react-router';
import { Button } from '@/components/ui/button/button';
import { toast } from 'sonner';
import getTokenFromResponsePageUrl from '@/utils/getTokenFromUrl';

export function FormPage() {
  const [form, setForm] = useState<Form | null>(null);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const formId = useParams<{ id: string }>().id;
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    setSuccess(false);
    const fetchForm = async () => {
      const castFormId = Number(formId);

      if (castFormId) {
        const form = await fetchGetForm(castFormId);
        setForm(form);
      }
    };
    fetchForm();
  }, [formId]);

  const handleChange = (question: Question, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [String(question.id)]: value }));
  };

  const handleOptionChange = (question: Question, optionId: number, checked: boolean) => {
    if (question.selector === 'checkbox') {
      setAnswers((prev) => {
        const prevValue = prev[String(question.id)];
        const prevArr: number[] = Array.isArray(prevValue) ? prevValue : [];

        if (checked) {
          return { ...prev, [String(question.id)]: [...prevArr, optionId] };
        } else {
          return { ...prev, [String(question.id)]: prevArr.filter((id) => id !== optionId) };
        }
      });
    } else if (question.selector === 'radio') {
      setAnswers((prev) => ({ ...prev, [String(question.id)]: optionId }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = getTokenFromResponsePageUrl();

    if (!token) {
      toast.error('Formulaire invalide');
      return;
    }

    if (form) {
      for (const q of form.questions) {
        if (q.required) {
          const val = answers[String(q.id)];
          if (
            val === undefined ||
            (q.selector === 'text' && String(val).trim() === '') ||
            (q.selector === 'radio' && (val === null || val === undefined || val === '')) ||
            (q.selector === 'checkbox' && (!Array.isArray(val) || val.length === 0))
          ) {
            toast.error('Merci de répondre à toutes les questions obligatoires.');
            return;
          }
        }
      }
      const payload = { form_id: form.id, response: answers, token };
      try {
        const response = await fetchUpdateResponse(form.id, payload);

        if (response?.status === 'error') {
          toast.error(response.error);
          return;
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('Une erreur est survenue lors de la création de la réponse.');
        }
        return;
      }
    }
    toast.success('Réponses envoyées !');
    setSuccess(true);
    setAnswers({});
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="form flex w-full max-w-xl flex-col gap-4 rounded border p-4 shadow-md">
        {form ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <h2 className="mb-2 text-center text-2xl font-bold">{form.title}</h2>
            <p className="mb-4 text-center text-gray-600">{form.description}</p>

            {success ? (
              <div className="mb-2 text-center text-green-600">Réponses envoyées !</div>
            ) : (
              <>
                {form.questions.map((question) => (
                  <div
                    key={question.id}
                    className="mb-2 flex flex-col gap-2 rounded border border-gray-100 p-2"
                  >
                    <label className="mb-1 block flex flex-col font-semibold">
                      <h1 className="mb-1 self-center text-lg text-gray-600">Question {question.id}</h1>
                      {question.title}
                      {question.required && <span className="ml-1 text-red-500">*</span>}
                    </label>

                    {question.image_url && (
                      <img
                        src={[import.meta.env.VITE_BACKEND_URL, question.image_url].join('')}
                        alt={question.title}
                        className="mb-2 max-h-40 self-center"
                      />
                    )}

                    {question.selector === 'text' && (
                      <input
                        type="text"
                        className="w-full rounded border px-2 py-1"
                        value={answers[question.id]?.toString() || ''}
                        onChange={(e) => handleChange(question, e.target.value)}
                        required={question.required}
                      />
                    )}

                    {question.selector === 'radio' && (
                      <div className="flex flex-col gap-1">
                        {question.options.map((option) => (
                          <label
                            key={option.id}
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="radio"
                              name={`q_${question.id}`}
                              value={option.id}
                              checked={answers[question.id] === option.id}
                              onChange={() => handleOptionChange(question, option.id, true)}
                              required={question.required}
                            />

                            {option.title}
                          </label>
                        ))}
                      </div>
                    )}
                    {question.selector === 'checkbox' && (
                      <div className="flex flex-col gap-1">
                        {question.options.map((option) => (
                          <label
                            key={option.id}
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              name={`q_${question.id}_opt_${option.id}`}
                              value={option.id}
                              checked={
                                Array.isArray(answers[question.id]) &&
                                (answers[question.id] as number[]).includes(option.id)
                              }
                              onChange={(e) => handleOptionChange(question, option.id, e.target.checked)}
                            />

                            {option.title}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <Button
                  type="submit"
                  className="w-full"
                >
                  Envoyer
                </Button>
              </>
            )}
          </form>
        ) : (
          <p>Loading form...</p>
        )}
      </div>
    </div>
  );
}
