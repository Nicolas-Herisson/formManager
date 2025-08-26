import { Question, ParsedResponse } from "@/types/types";
import calculPercentage from "./calculPercentage";

export default function calculateResponseStats(responses: ParsedResponse[], question: Question) {

    let totalOptions = 0;
    const responsesByQuestion: Record<string, number> = {};

    for (const response of responses) {

        const val = response.parsed[question.id];

        if (val === undefined) continue;

        if (question.selector === "radio" || question.selector === "select") {

            const opt = question.options.find(o => o.id === val);

            if (opt && opt.title) {
                totalOptions++;
                responsesByQuestion[opt.title] = (responsesByQuestion[opt.title] || 0) + 1;
            }
        }

        if (question.selector === "checkbox") {

            if (Array.isArray(val)) {

                for (const id of val) {

                        const opt = question.options.find(o => o.id === id);
                        
                        if (opt && opt.title) {
                            totalOptions++;
                            // store the number of responses for each option
                            responsesByQuestion[opt.title] = (responsesByQuestion[opt.title] || 0) + 1;
                        }
                    }
                }
            } 
        }  
        const percentage = calculPercentage(responsesByQuestion, totalOptions);
        
        return {percentage, responsesByQuestion};
    }