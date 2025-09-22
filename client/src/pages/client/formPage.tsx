import React, { useEffect, useState } from "react";
import type { Form, Question, AnswerMap, AnswerValue } from "@/types/types";
import { fetchGetForm } from "@/services/formRequests";
import {fetchCreateResponse} from "@/services/responseRequests";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

        if (question.selector === "checkbox") {

            setAnswers((prev) => {

                const prevValue = prev[String(question.id)];
                const prevArr: number[] = Array.isArray(prevValue) ? prevValue : [];

                if (checked) {
                    return { ...prev, [String(question.id)]: [...prevArr, optionId] };
                } else {
                    return { ...prev, [String(question.id)]: prevArr.filter((id) => id !== optionId) };
                }
            });
        } else if (question.selector === "radio") {
            setAnswers((prev) => ({ ...prev, [String(question.id)]: optionId }));
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form) {
            for (const q of form.questions) {
                if (q.required) {
                    const val = answers[String(q.id)];
                    if (
                        val === undefined ||
                        (q.selector === "text" && String(val).trim() === "") ||
                        (q.selector === "radio" && (val === null || val === undefined || val === "")) ||
                        (q.selector === "checkbox" && (!Array.isArray(val) || val.length === 0))
                    ) {
                        toast.error("Merci de répondre à toutes les questions obligatoires.");
                        return;
                    }
                }
            }

           try {

           await fetchCreateResponse({ form_id: form.id, response: answers });

           } catch (error) {

            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Une erreur est survenue lors de la création de la réponse.");
            }
            return;
           }
        }
        toast.success("Réponses envoyées !");
        setSuccess(true);
        setAnswers({});
    };

    return (
        <div className="p-4 flex flex-col items-center">
            <div className="form border p-4 rounded shadow-md flex flex-col gap-4 max-w-xl w-full">

                {form ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <h2 className="text-2xl font-bold text-center mb-2">{form.title}</h2>
                        <p className="text-gray-600 text-center mb-4">{form.description}</p>
                        
                        {success ? (
                            <div className="text-green-600 text-center mb-2">Réponses envoyées !</div>
                        ) : (
                            <>
                                {form.questions.map((question) => (
                                <div key={question.id} className="mb-2">
                                    <label className="block font-semibold mb-1">
                                        {question.title}
                                        {question.required && <span className="text-red-500 ml-1">*</span>}
                                    </label>
                                    {question.selector === "text" && (
                                        <input
                                            type="text"
                                            className="border rounded px-2 py-1 w-full"
                                            value={answers[question.id]?.toString() || ''}
                                            onChange={e => handleChange(question, e.target.value)}
                                            required={question.required}
                                        />
                                    )}
                                    {question.selector === "radio" && (
                                        <div className="flex flex-col gap-1">
                                            {question.options.map(option => (
                                                <label key={option.id} className="inline-flex items-center gap-2">
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
                                    {question.selector === "checkbox" && (
                                        <div className="flex flex-col gap-1">
                                            {question.options.map(option => (
                                                <label key={option.id} className="inline-flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        name={`q_${question.id}_opt_${option.id}`}
                                                        value={option.id}
                                                        checked={Array.isArray(answers[question.id]) && (answers[question.id] as number[]).includes(option.id)}
                                                        onChange={e => handleOptionChange(question, option.id, e.target.checked)}
                                                    />
                                                    {option.title}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                        ))}
                        <Button type="submit" className="w-full">
                            Envoyer
                        </Button>
                        </>)}

                    </form>
                ) : (
                    <p>Loading form...</p>
                )}
            </div>
        </div>
    );
}