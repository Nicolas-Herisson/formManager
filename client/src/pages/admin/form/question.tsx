import { Button } from '@/components/ui/button/button';
import type { Question as QuestionType } from '../../../types/types';
import type { Option } from '../../../types/types';
import SelectorOption from './selectorOption';
import { Trash2, ChevronDown } from 'lucide-react';

export default function Question({ id, data, removeQuestion, updateQuestion, questionNumber }: IQuestion) {
  function addOption() {
    const newOption = { id: data.options.length + 1, title: '', checked: false };
    updateQuestion(id, { ...data, options: [...data.options, newOption] });
  }

  function removeOption(optionId: number) {
    updateQuestion(id, { ...data, options: data.options.filter((opt) => opt.id !== optionId) });
  }

  function updateOption(optionId: number, option: Option) {
    updateQuestion(id, { ...data, options: data.options.map((opt) => (opt.id === optionId ? option : opt)) });
  }

  return (
    <div className="space-y-6 rounded-lg border-2 border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-800">Question {questionNumber}</h3>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => removeQuestion(id)}
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
          title="Supprimer la question"
        >
          <Trash2 size={16} />
        </Button>
      </div>

      {/* Question title */}
      <div className="space-y-2">
        <label
          htmlFor={`title-${id}`}
          className="block text-sm font-medium text-gray-700"
        >
          Intitulé de la question
        </label>
        <input
          type="text"
          id={`title-${id}`}
          placeholder="Ex: Quel est votre nom ?"
          value={data.title}
          onChange={(e) => updateQuestion(id, { ...data, title: e.target.value })}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      {/* Question type */}
      <div className="space-y-2">
        <label
          htmlFor={`selector-${id}`}
          className="block text-sm font-medium text-gray-700"
        >
          Type de question
        </label>
        <div className="relative">
          <select
            id={`selector-${id}`}
            className="block w-full appearance-none rounded-md border border-gray-300 py-2 pr-10 pl-3 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
            value={data.selector}
            onChange={(e) =>
              updateQuestion(id, {
                ...data,
                selector: e.target.value,
                options: e.target.value === 'text' ? [] : [{ id: 0, title: '', checked: false }]
              })
            }
          >
            <option value="text">Réponse courte</option>
            <option value="radio">Choix unique</option>
            <option value="checkbox">Choix multiples</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor={`image-${id}`}
          className="block text-sm font-medium text-gray-700"
        >
          Image
        </label>
        <div className="relative">
          <input
            type="file"
            id={`image-${id}`}
            className="block w-full appearance-none rounded-md border border-gray-300 py-2 pr-10 pl-3 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                const imageUrl = URL.createObjectURL(file);

                updateQuestion(id, {
                  ...data,
                  image: imageUrl
                });

                if (data.image) {
                  URL.revokeObjectURL(data.image);
                }
              }
            }}
          />
          {data.image && (
            <img
              src={data.image}
              alt=""
              className="mx-auto mt-2"
            />
          )}
        </div>
      </div>

      {/* Options */}
      {data.selector !== 'text' && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Options</label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addOption}
              className="text-sm text-blue-600 hover:bg-blue-50"
            >
              + Ajouter une option
            </Button>
          </div>

          <div className="space-y-3">
            {data.options.map((option) => (
              <SelectorOption
                key={option.id}
                id={option.id}
                data={option}
                removeOption={removeOption}
                updateOption={updateOption}
              />
            ))}
          </div>
        </div>
      )}

      {/* Required */}
      <div className="flex items-center pt-2">
        <input
          type="checkbox"
          id={`required-${id}`}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          checked={data.required}
          onChange={(e) => updateQuestion(id, { ...data, required: e.target.checked })}
        />
        <label
          htmlFor={`required-${id}`}
          className="ml-2 block text-sm text-gray-700"
        >
          Requis
        </label>
      </div>
    </div>
  );
}

interface IQuestion {
  id: number;
  data: QuestionType;
  removeQuestion: (id: number) => void;
  updateQuestion: (id: number, question: QuestionType) => void;
  questionNumber: number;
}
