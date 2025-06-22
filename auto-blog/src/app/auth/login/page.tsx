'use client';

import Link from "next/link";
import { useState } from "react";
import { redirect } from "next/navigation";
//API
import { auth } from "@/api/Auth";
//COMPONENTS
import Message from "../Components/Message";

export default function Login() {

    const [message, setMessage] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    //Envia os dados do login para authenticação:
    async function authLogin(email: string, password: string): Promise<{ access: boolean }> {
        return await auth(email, password);
    }
    //Valida o login e redireciona:
    async function checkLogin(): Promise<boolean | void> {
        if (!email) return setMessage('Você esqueceu de preencher o email!');
        if (!password) return setMessage('Você esqueceu de preencher a senha!');
        const response: { access: boolean } = await authLogin(email, password);
        if (response.access) {
            setMessage('Logado com sucesso!');
            setTimeout(() => redirect('/painel'), 2000);
            return;
        }
        if (!response.access) return setMessage('Login ou senha inválida!');
    }

    return (
        <section className="text-[#6d6969] flex h-screen justify-center items-center bg-[#6D9AC4]">
            <div className="bg-[#FFFFFF] py-12 w-[90%] rounded-[.3em] flex items-center justify-center sm:w-[60%] lg:w-[40%] xl:w-[30%] 2xl:w-[400px]">
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
                    <Message msg={message} />
                    <div>
                        <button className="text-[#FFFFFF] py-1 w-full bg-[#ED5684] rounded-[.3em] cursor-pointer hover:scale-105" onClick={checkLogin}>ENTRAR</button>
                    </div>
                    <div className="flex justify-between items-center my-3">
                        <hr className="w-[45%] inline-block" />
                        <p>OU</p>
                        <hr className="w-[45%] inline-block" />
                    </div>
                    <div className="text-center">
                        <p className="text-[14px]">Precisa de uma conta? <Link href={'/auth/register'} className="underline cursor-pointer">Cadastre-se</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}
