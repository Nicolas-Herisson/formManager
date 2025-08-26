import React from "react";
import { useEffect } from "react";
import { fetchGetResponses } from "@/services/responseRequests";
import type { Form, ParsedResponse } from "@/types/types";
import calculateResponseStats from "@/utils/getResponsesStats";

export default function ResponsesPage({ selectedForm }: IResponsesPageProps) {

    const [responses, setResponses] = React.useState<ParsedResponse[]>([]);

    useEffect(() => {
        async function fetchResponses() {
            try {
                
                const res: Array<{ id: number; form_id: number; response: string }> = await fetchGetResponses(selectedForm.id);
                
                const parsed: ParsedResponse[] = res.map((r) => ({
                    ...r,
                    parsed: r.response ? JSON.parse(r.response) : {},
                }));
                
                setResponses(parsed);
            } catch {
                setResponses([]);
            }
        }
        fetchResponses();
    }, [selectedForm.id]);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedForm.title}</h1>
                <p className="text-gray-600">{selectedForm.description}</p>
            </div>
            
            <div className="space-y-10">
                {selectedForm.questions.map((question) => {
                    const { percentage, responsesByQuestion } = calculateResponseStats(responses, question);
                    const totalResponses = responses.length;
                    
                    return (
                        <div key={question.id} className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">{question.title}</h2>
                            
                            <div className="space-y-4">
                                {Object.entries(responsesByQuestion).map(([option, count]) => (
                                    <div key={option} className="mb-4">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-gray-700">{option}</span>
                                            <span className="text-gray-500">
                                                {count} vote{count > 1 ? 's' : ''} • {percentage[option].toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div 
                                                className="bg-blue-600 h-2.5 rounded-full" 
                                                style={{ width: `${percentage[option]}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                                
                                {question.selector === 'text' && (
                                    <div className="mt-6">
                                        <h3 className="text-sm font-medium text-gray-700 mb-3">Réponses textuelles ({responses.filter(r => r.parsed[question.id] !== undefined).length})</h3>
                                        <div className="space-y-2">
                                            {responses.map((response) => {
                                                const val = response.parsed[question.id];
                                                return val ? (
                                                    <div key={response.id} className="bg-gray-50 p-3 rounded-md border border-gray-200 text-sm">
                                                        {val}
                                                    </div>
                                                ) : null;
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="mt-4 text-xs text-gray-500">
                                Total des réponses : {totalResponses}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

interface IResponsesPageProps {
    selectedForm: Form;
}
