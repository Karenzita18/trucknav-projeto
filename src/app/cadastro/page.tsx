'use client'

import React, { useState } from "react";
import signUp from "../../firebase/auth/SignUp";
import { useRouter } from 'next/navigation';

function Page1() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
    const router = useRouter();

    const handleForm = async (event: React.FormEvent) => {
        event.preventDefault();

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error);
        }

        // else successful
        console.log(result);
        return router.push("/entrar");
    };

    // Função para alternar a visibilidade da senha
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
       <div className="flex flex-col justify-between min-h-screen">
            <section  className="bg-brand-200/80 flex justify-center place-content-center h-full grow px-5 place-items-center min-h-screen">
                <div className="row w-full h-fit">
                    <div className="container mx-auto">
                        <div className="flex flex-col max-w-xl bg-zinc-50 rounded-xl px-5 sm:px-10 pb-6 sm:pb-7 mx-auto shadow-lg">
                            <div className="w-32 sm:w-44 h-32 sm:h-44 mx-auto mt-5 mb-2">
                                <img
                                    src="/img/img.png"
                                    alt="logo"
                                    className="rounded-full"
                                />
                            </div>
                            <h1 className="text-center md:text-3xl text-4xl text-brand-100 font-bold mb-3">
                                Cadastrar
                            </h1>
                            <form onSubmit={handleForm} className="flex flex-col items-center">
                                <label htmlFor="email" className="mb-4">
                                    <p>Email</p>
                                    <input 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required 
                                        type="email" 
                                        name="email" 
                                        id="email"  
                                        placeholder="example@mail.com"
                                       className="border p-2 rounded"
                                    />
                                </label>
                                <label htmlFor="password"  className="mb-4 relative">
                                    <p>Password</p>
                                    <input 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required 
                                        type={showPassword ? 'text' : 'password'} // Alterna entre "text" e "password"
                                        name="password" 
                                        id="password"
                                        placeholder="password" 
                                        className="border p-2 rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-2 top-10 text-sm"
                                    >
                                        {showPassword ? 'Ocultar' : 'Mostrar'}
                                    </button>
                                </label>
                                <button 
                                    type="submit" 
                                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                                >
                                    Salvar
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => router.push("/entrar")} 
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Voltar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
       </div>
    );
}

export default Page1;
