import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import type { Login } from "../types/types";
import { toast } from "sonner";
import { fetchLogin } from "../services/authRequests";
import { fetchGetMe } from "../services/userRequests";
import type { User } from "../types/types";

export default function Login({setUser}: {setUser: (user: User) => void}) {
    const navigate = useNavigate();
    const { register, handleSubmit} = useForm<Login>();
    
    const onSubmit = async (data: Login) => {
        const response = await fetchLogin(data);

        if(response.message === 'User logged in successfully') {
            const user = await fetchGetMe();
            setUser(user);
            navigate('/');
        }
        else {
            toast.error(response.message);
        }
    }
    
    return (
        <div className="flex gap-4 justify-center items-center h-screen">
            <form className="flex flex-col gap-4 border border-gray-200 p-4 rounded" onSubmit={handleSubmit(onSubmit)}>

                <h1 className="text-2xl font-bold self-center">Connexion</h1>

                <label htmlFor="email" className="text-lg font-semibold">Email</label>
                <input type="text" id="email" placeholder="Email" className="border border-gray-200 rounded p-2" {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />

                <label htmlFor="password" className="text-lg font-semibold">Password</label>
                <input type="password" id="password" placeholder="Password" className="border border-gray-200 rounded p-2" {...register('password', { required: true, minLength: 8, maxLength: 20, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/ })} />

                <Button>Connexion</Button>
            </form>
        </div>
    );
}