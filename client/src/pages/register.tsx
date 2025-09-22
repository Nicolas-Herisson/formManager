import { Button } from "@/components/ui/button";

export default function Register() {
    return (
        <div className="flex gap-4 justify-center items-center h-screen">
            <form className="flex flex-col gap-4 border border-gray-200 p-4 rounded">

                <h1 className="text-2xl font-bold self-center">Inscription</h1>

                <label htmlFor="name" className="text-lg font-semibold">Nom</label>
                <input type="text" id="name" placeholder="Nom" className="border border-gray-200 rounded p-2" />

                <label htmlFor="email" className="text-lg font-semibold">Email</label>
                <input type="text" id="email" placeholder="Email" className="border border-gray-200 rounded p-2" />

                <label htmlFor="password" className="text-lg font-semibold">Password</label>
                <input type="password" id="password" placeholder="Password" className="border border-gray-200 rounded p-2" />

                <label htmlFor="confirmPassword" className="text-lg font-semibold">Confirm Password</label>
                <input type="password" id="confirmPassword" placeholder="Confirm Password" className="border border-gray-200 rounded p-2" />

                <Button>Enregistrer</Button>
            </form> 
        </div>
    );
}