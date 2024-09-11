'use client'

import React from "react";
import signUp from "../../firebase/auth/SingUp";
import { useRouter } from 'next/navigation';

function Page1() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event: React.FormEvent) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/singIn")
    }
    return (
        <section  className="bg-brand-300/40 ">
            <div className="container">
                <div className="row">
                    <h1 className="text-center md:text-3xl text-4xl text-brand-100 font-bold mb-3">Cadastrar</h1>
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
                        <label htmlFor="password"  className="mb-4">
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
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Salvar</button>
                        {/*<button type="button" onClick={() => router.push("/singIn")} className="bg-gray-500 text-white px-4 py-2 rounded">Login</button>*/}
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Page1;