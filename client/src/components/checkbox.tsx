export default function Checkbox({optionNumber, label}: {optionNumber: number, label: string}) {
    return (
        <label className="flex items-center gap-2"> {label}
                <input type="checkbox" name={`option${optionNumber}`} id={`option${optionNumber}`} placeholder="Options" />
            </label>
    );
}