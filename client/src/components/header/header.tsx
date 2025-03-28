export default function Header() {
    return (
        <div className="header w-screen h-16 border-b border-solid border-gray-300 p-4">
            <nav className="pl-10">
                <ul className="flex gap-10">
                    <li>Edit</li>
                    <li>Responses</li>
                </ul>
            </nav>
        </div>
    );
}