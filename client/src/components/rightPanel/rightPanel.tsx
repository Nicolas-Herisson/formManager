import Header from "@/components/header/header";
import Body from "@/components/body";

export default function RightPanel() {
    return (
        <div className="right-panel w-7/8 h-screen overflow-y-auto">
            <Header />
            <Body />
        </div>
    );
}