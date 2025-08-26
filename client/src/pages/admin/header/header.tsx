import { Button } from "@/components/ui/button";

export default function Header({ selectedPage, setSelectedPage }: IHeaderProps) {
    return (
        <div className="header w-full h-16 border-b border-solid border-gray-200 bg-white shadow-sm">
            <nav className="h-full">
                <ul className="flex h-full items-center gap-1 px-6">
                    <li>
                        <Button 
                            variant={selectedPage === "edit" ? "secondary" : "ghost"}
                            className={`${selectedPage === "edit" ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' : 'text-gray-600 hover:bg-gray-50'}`}
                            onClick={() => setSelectedPage("edit")}
                        >
                            Éditer
                        </Button>
                    </li>
                    <li>
                        <Button 
                            variant={selectedPage === "responses" ? "secondary" : "ghost"}
                            className={`${selectedPage === "responses" ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' : 'text-gray-600 hover:bg-gray-50'}`}
                            onClick={() => setSelectedPage("responses")}
                        >
                            Réponses
                        </Button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

interface IHeaderProps {
    selectedPage: string;
    setSelectedPage: (page: string) => void;
}