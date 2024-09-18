"use client";


import { useRouter } from "next/navigation";
import { useAuthContext } from "../../context/AuthContext";
import { useState, FormEvent } from "react";
import { updateEmail, updatePassword, User } from "firebase/auth"; // Importando os métodos e tipos necessários


function Page3() {
        const { userAuth, logout } = useAuthContext();
        const router = useRouter();
    
        const [email, setEmail] = useState<string>(userAuth?.email || ""); // Estado para o email com tipagem
        const [password, setPassword] = useState<string>(""); // Estado para a senha com tipagem
        const [error, setError] = useState<string | null>(null); // Estado para erros com tipagem
    
        // Redireciona para a página de login se o usuário não estiver autenticado
        if (userAuth == null) {
            router.push("/signIn");
        }
    
        // Função para atualizar o email e a senha do usuário no Firebase
        const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
            e.preventDefault();
    
            try {
                if (userAuth) {
                    // Atualizar o email se o valor do email foi modificado
                    if (email && email !== userAuth.email) {
                        await updateEmail(userAuth as User, email);
                    }
    
                    // Atualizar a senha se uma nova senha foi inserida
                    if (password) {
                        await updatePassword(userAuth as User, password);
                    }
    
                    alert("Perfil atualizado com sucesso!");
                }
            } catch (error) {
                setError("Erro ao atualizar perfil: " + (error as Error).message); // Tratamento de erro
            }
        };
    
    return (
        <div  className="bg-brand-300/10 flex flex-col justify-between min-h-screen">
             <section className="bg-brand-300/40 flex justify-center place-content-center h-full grow px-5 place-items-center">
                <div className="row w-full h-fit">
                    <div  className="container mx-auto">
                        <div  className="flex flex-col max-w-xl bg-zinc-50 rounded-xl px-5 sm:px-10 pb-6 sm:pb-7 mx-auto shadow-lg">
                            <div className="w-32 sm:w-44 h-32 sm:h-44 mx-auto -mt-10 mb-2">
                                <img
                                    src="/img/img.png"
                                    alt="logo"
                                    className="rounded-full"
                                />
                            </div>
                            <h1 className="text-center md:text-3xl text-4xl text-brand-100 font-bold mb-3">
                                Editar Perfil
                            </h1>

                              {error && <p className="text-red-500">{error}</p>}

                            <form onSubmit={handleUpdateProfile}  className="flex flex-col items-center">
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
                                <label htmlFor="password" className="mb-4">
                                    <p>Password</p>
                                    <input 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        placeholder="password" 
                                        className="border p-2 rounded"
                                    />
                                </label>
                               
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mb-4"> Atualizar Perfil</button>
                                <button onClick={() => logout()} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Sign Out </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}

export default Page3;