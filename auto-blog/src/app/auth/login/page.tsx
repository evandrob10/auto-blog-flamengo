'use client';
import { auth } from "@/api/Auth";
import Link from "next/link";
import { useState } from "react";
import Message from "../Components/Message";
import { redirect } from "next/navigation";


export default function Login() {

    const [message, setMessage] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    async function authLogin(email: string, password: string) {
       return await auth(email, password);
    }

    async function checkLogin(): Promise<boolean | void> {
        if (!email) return setMessage('Você esqueceu de preencher o email!');
        if (!password) return setMessage('Você esqueceu de preencher a senha!');
        const response = await authLogin(email, password);
        if(response) setMessage('Logado com sucesso!');
        setTimeout(()=> redirect('/painel'), 2000);
    }

    return (
        <section className="text-[#6d6969] flex h-screen justify-center items-center bg-[#6D9AC4]">
            <div className="bg-[#FFFFFF] h-[60%] w-[90%] rounded-[.3em] flex items-center justify-center">
                <div className="w-[80%] h-[80%]">
                    <h1 className="text-[21px] mb-3">LOGIN</h1>
                    <div>
                        <div className="mb-2">
                            <label className="block mb-1" htmlFor="email" >Email</label>
                            <input className="p-1 border-1 w-full rounded-[.3em]" type="text" id="email" placeholder="exemple@gmail.com" onChange={event => setEmail(event.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-1" htmlFor="password">Senha</label>
                            <input className="p-1 border-1 w-full rounded-[.3em]" type="password" id="password" placeholder="******" onChange={event => setPassword(event.target.value)} />
                        </div>
                    </div>
                    <Message msg={message}  />
                    <div>
                        <button className="text-[#FFFFFF] py-1 w-full bg-[#ED5684] rounded-[.3em]" onClick={checkLogin}>ENTRAR</button>
                    </div>
                    <div className="flex justify-between items-center my-3">
                        <hr className="w-[45%] inline-block" />
                        <p>OU</p>
                        <hr className="w-[45%] inline-block" />
                    </div>
                    <div className="text-center">
                        <p className="text-[14px] ">Precisa de uma conta? <Link href={'/auth/register'} className="underline">Cadastre-se</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}
