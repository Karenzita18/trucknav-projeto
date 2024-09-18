"use client";

import { useState, FormEvent } from "react";
import { FirebaseError } from "firebase/app";
import signIn from "../../firebase/auth/SignIn";
import { useRouter } from 'next/navigation';

function Page2() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const getErrorMessage = (code: string) => {
        switch (code) {
            case 'auth/invalid-credential':
                return 'Credenciais inválidas. Verifique o email e a senha.';
            case 'auth/user-not-found':
                return 'Usuário não encontrado. Verifique o email informado.';
            case 'auth/wrong-password':
                return 'Senha incorreta. Tente novamente.';
            case 'auth/too-many-requests':
                return 'Muitas tentativas. Por favor, tente novamente mais tarde.';
            default:
                return 'Ocorreu um erro inesperado. Tente novamente.';
        }
    };

    const handleForm = async (event: FormEvent) => {
        event.preventDefault();
        setErrorMessage('');
        try {
            const { result, error } = await signIn(email, password);

            // Verifique se houve um erro
            if (error) {
                const firebaseError = error as FirebaseError;
                const errorMsg = getErrorMessage(firebaseError.code);
                setErrorMessage(errorMsg);  // Atualiza a mensagem de erro
                return;  // Interrompe o fluxo se houver um erro
            }

            // Se o login for bem-sucedido, redireciona o usuário
            if (result) {
                console.log(result);
                return router.push("/");
            }

        } catch (error) {
            console.error('Error: ', error);
            setErrorMessage('Ocorreu um erro inesperado. Tente novamente.'); // Mensagem genérica para erros não esperados
        }
    };

    return (
        <div className="bg-brand-300/10 flex flex-col justify-between min-h-screen">
            <section className="bg-brand-300/40 flex justify-center place-content-center h-full grow px-5 place-items-center">
                <div className="row w-full h-fit">
                    <div className="container mx-auto">
                        <div className="flex flex-col max-w-xl bg-zinc-50 rounded-xl px-5 sm:px-10 pb-6 sm:pb-7 mx-auto shadow-lg">
                            <div className="w-32 sm:w-44 h-32 sm:h-44 mx-auto -mt-10 mb-2">
                                <img
                                    src="/img/img.png"
                                    alt="logo"
                                    className="rounded-full"
                                />
                            </div>
                            <h1 className="text-center md:text-3xl text-4xl text-brand-100 font-bold mb-3">
                                Login
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
                                {errorMessage && (  // Exibe a mensagem de erro se houver
                                    <p className="text-red-500 mb-4">{errorMessage}</p>
                                )}
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Entrar</button>
                                <button type="button" onClick={() => router.push("/signUp")} className="bg-gray-500 text-white px-4 py-2 rounded">Cadastrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Page2;
