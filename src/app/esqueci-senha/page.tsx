"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function EsqueciSenha() {
    const router = useRouter();
    
    const [email, setEmail] = useState<string>(""); // Estado para o email
    const [message, setMessage] = useState<string | null>(null); // Mensagem de sucesso
    const [error, setError] = useState<string | null>(null); // Mensagem de erro

    // Função para enviar o email de redefinição de senha
    const handleResetPassword = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const auth = getAuth();

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Email de redefinição de senha enviado com sucesso!");
            setEmail(""); // Limpa o campo de email
            setError(null); // Limpa a mensagem de erro
        } catch (error) {
            setError("Erro ao enviar email: " + (error as Error).message); // Tratamento de erro
            setMessage(null); // Limpa a mensagem de sucesso
        }
    };

    return (
        <div className="flex flex-col justify-between min-h-screen">
            <section className="bg-brand-200/80 flex justify-center place-content-center h-full grow px-5 place-items-center min-h-screen">
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
                                Redefinir Senha
                            </h1>

                            <form onSubmit={handleResetPassword} className="flex flex-col items-center">
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
                                
                                        
                                {error && <p className="text-red-500 mb-2">{error}</p>}
                                {message && <p className="text-green-500 mb-2">{message}</p>}


                                <button 
                                    type="submit" 
                                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                                >
                                    Enviar Email
                                </button>
                                <button 
                                    onClick={() => router.push('/entrar')} 
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

export default EsqueciSenha;
