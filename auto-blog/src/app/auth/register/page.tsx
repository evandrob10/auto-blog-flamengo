'use client';
import { auth, createUser } from '@/api/Auth';
import { CreateUserType } from '@/api/Auth/interface';
import Link from 'next/link'
import { redirect } from 'next/navigation';

import React, { useState } from 'react'
import Message from '../Components/Message';

export default function Register() {
    const [dataUser, setDataUser] = useState<CreateUserType>({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState<string>();

    function checkData(): boolean | void {
        if (!dataUser?.firstName) return setMessage('Você esqueceu de preenhcer o nome!');
        if (!dataUser?.lastName) return setMessage('Você esqueceu de preenhcer o sobrenome!');
        if (!dataUser?.email) return setMessage('Você esqueceu de preenhcer o email!');
        if (!dataUser?.password) return setMessage('Você esqueceu de preenhcer a senha!');
        return true;
    }

    async function registerUser() {
        const response = checkData()
        if (response && dataUser) {
            await createUser(dataUser);
            setMessage('Cadastrado com sucesso!');
            const response: {access: boolean} = await auth(dataUser.email, dataUser.password);
            if(response.access) setTimeout(() => redirect('/painel'), 2000)
            else setMessage('Ocorreu um erro ao cadastrar o usuario!');
        }
    }

    return (
        <section className="text-[#6d6969] flex h-screen justify-center items-center bg-[#6D9AC4]">
            <div className="bg-[#FFFFFF] py-[10%] w-[90%] rounded-[.3em] flex items-center justify-center">
                <div className="w-[80%] h-[80%]">
                    <h1 className="text-[21px] mb-3">CADASTRO</h1>
                    <div>
                        <div className="mb-2">
                            <label className="block mb-1" htmlFor="name">Nome*:</label>
                            <input className="p-1 border-1 w-full rounded-[.3em]" onChange={(event) => setDataUser(prev => prev ? ({ ...prev, firstName: event.target.value }) : prev)} type="text" id="name" placeholder="Nome" />
                        </div>
                        <div className="mb-2">
                            <label className="block mb-1" htmlFor="lastname">Sobrenome*:</label>
                            <input className="p-1 border-1 w-full rounded-[.3em]" onChange={(event) => setDataUser(prev => prev ? ({ ...prev, lastName: event.target.value }) : prev)} type="text" id="lastname" placeholder="Sobrenome" />
                        </div>
                        <div className="mb-2">
                            <label className="block mb-1" htmlFor="email">Email*:</label>
                            <input className="p-1 border-1 w-full rounded-[.3em]" onChange={(event) => setDataUser(prev => prev ? ({ ...prev, email: event.target.value }) : prev)} type="text" id="email" placeholder="exemple@gmail.com" />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-1" htmlFor="password">Senha*:</label>
                            <input className="p-1 border-1 w-full rounded-[.3em]" onChange={(event) => setDataUser(prev => prev ? ({ ...prev, password: event.target.value }) : prev)} type="password" id="password" placeholder="******" />
                        </div>
                    </div>
                    <Message msg={message} />
                    <div>
                        <button className="text-[#FFFFFF] py-1 w-full bg-[#ED5684] rounded-[.3em] my-2 cursor-pointer" onClick={registerUser}>CADASTRAR</button>
                    </div>
                    <div className="flex justify-between items-center my-3">
                        <hr className="w-[45%] inline-block" />
                        <p>OU</p>
                        <hr className="w-[45%] inline-block" />
                    </div>
                    <div className="text-center">
                        <p className="text-[14px] ">Já tem uma conta? <Link href={'/auth/login'} className="underline">Faça o login</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}
