"use client";

import { useState, FormEvent } from "react";
import { FirebaseError } from "firebase/app";
import signIn from "../../firebase/auth/singIn";
import { useRouter } from 'next/navigation';


function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleForm = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const { result, error } = await signIn(email, password);

            if (error) {
                const firebaseError = error as FirebaseError;
                if (firebaseError.message) {
                    console.log(firebaseError.message);
                    throw new Error(firebaseError.message);
                } else {
                    console.log('Unknown Error:', firebaseError);
                    throw new Error('Unknown Error');
                }
            }

            console.log(result)
            return router.push("/");
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    return (
     
        <section className="bg-brand-300/40 ">
            <div className="container">
                <div className="row">
                    <h1 className="text-center md:text-3xl text-4xl text-brand-100 font-bold mb-3">Login</h1>
                    <form onSubmit={handleForm} className="flex flex-col items-center h-screen">
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
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Entrar</button>
                        <button type="button" onClick={() => router.push("/singUp")} className="bg-gray-500 text-white px-4 py-2 rounded">Cadastrar</button>
                    </form>

                </div>
            </div>
        </section>
    
    );
}

export default Page;