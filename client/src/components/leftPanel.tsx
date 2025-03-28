import { Button } from "@/components/ui/button";

export default function LeftPanel({showRightPanel, setShowRightPanel} : ILeftPanelProps) {


    return (
        <div className="left-panel w-1/8 h-screen border-r border-solid border-gray-300 p-4 flex flex-col items-center">
            <Button onClick={() => !showRightPanel && setShowRightPanel(true)} className="mx-auto">Create form</Button>
        </div>
    );
}

interface ILeftPanelProps {
    showRightPanel: boolean;
    setShowRightPanel: React.Dispatch<React.SetStateAction<boolean>>;
}