export default function calculPercentage(responsesByQuestion: Record<string, number>, totalOptions: number) {
    const percentageByOption: Record<string, number> = {};
    for (const option in responsesByQuestion) {
        percentageByOption[option] = (responsesByQuestion[option] / totalOptions) * 100;
    }
    return percentageByOption;
}
    