export default function Radio({optionNumber, label}: {optionNumber: number, label: string}) {
    return (
        <label className="flex items-center gap-2"> {label}
                <input type="radio" name={`option${optionNumber}`} id={`option${optionNumber}`} placeholder="Options" />
            </label>
    );
}