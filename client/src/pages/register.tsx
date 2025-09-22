import { Button } from "@/components/ui/button";
import { fetchRegister } from "@/services/authRequests";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type { Register } from "../types/types";
import { toast } from "sonner";

export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<Register>();
    
    const onSubmit = async (data: Register) => {

        const response = await fetchRegister(data);

        if(response === 'User created successfully') {
            toast.success('Inscription reussie');
            navigate('/login');
        }
        else {
            if(Array.isArray(response)) {
                for(const message of response) {
                    toast.error(message);
                }
            }
            else {
                toast.error(response);
            }
        }

    }
    
    return (
        <div className="flex gap-4 justify-center items-center h-screen">
            <form className="flex flex-col gap-4 border border-gray-200 p-4 rounded" onSubmit={handleSubmit(onSubmit)}>

                <h1 className="text-2xl font-bold self-center">Inscription</h1>

                <label htmlFor="name" className="text-lg font-semibold">Nom</label>
                <input type="text" id="name" placeholder="Nom" className="border border-gray-200 rounded p-2" {...register('name', { required: true })} />
                {errors.name && errors.name.type === 'required' && <p className="text-red-500">Champ obligatoire</p>}

                <label htmlFor="email" className="text-lg font-semibold">Email</label>
                <input type="text" id="email" placeholder="Email" className="border border-gray-200 rounded p-2" {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
                {errors.email && errors.email.type === 'required' && <p className="text-red-500">Champ obligatoire</p>}
                {errors.email && errors.email.type === 'pattern' && <p className="text-red-500">Email invalide</p>}

                <label htmlFor="password" className="text-lg font-semibold">Password</label>
                <input type="password" id="password" placeholder="Password" className="border border-gray-200 rounded p-2" {...register('password', { required: true, minLength: 8, maxLength: 20, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/ })} />
                {errors.password && errors.password.type === 'required' && <p className="text-red-500">Champ obligatoire</p>}
                {errors.password && errors.password.type === 'minLength' && <p className="text-red-500">Le mot de passe doit contenir au moins 8 caracteres</p>}
                {errors.password && errors.password.type === 'maxLength' && <p className="text-red-500">Le mot de passe doit contenir au maximum 20 caracteres</p>}
                {errors.password && errors.password.type === 'pattern' && <p className="text-red-500">Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractere special</p>}

                <label htmlFor="confirmPassword" className="text-lg font-semibold">Confirm Password</label>
                <input type="password" id="confirmPassword" placeholder="Confirm Password" className="border border-gray-200 rounded p-2" {...register('confirmPassword', { required: true, minLength: 8, maxLength: 20})} />
                {errors.confirmPassword && errors.confirmPassword.type === 'required' && <p className="text-red-500">Champ obligatoire</p>}
                {errors.confirmPassword && errors.confirmPassword.type === 'minLength' && <p className="text-red-500">Le mot de passe doit contenir au moins 8 caracteres</p>}
                {errors.confirmPassword && errors.confirmPassword.type === 'maxLength' && <p className="text-red-500">Le mot de passe doit contenir au maximum 20 caracteres</p>}

                <Button type="submit">Enregistrer</Button>

                <p className="text-center">Vous avez déjà un compte ? <Button type="button" onClick={() => navigate('/login')}>Se connecter</Button></p>
            </form> 
        </div>
    );
}