import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Auth() {
    const navigate = useNavigate();

    const login = () => {
        navigate('/login');
    }

    const register = () => {
        navigate('/register');
    }

    return (
        <div className="flex gap-4 justify-center items-center h-screen">
            <Button onClick={register}>Inscription</Button>
            <Button onClick={login}>Connexion</Button>
        </div>
    );
}