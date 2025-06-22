'use client';
import Link from "next/link";
import { logout, verifyToken } from "@/api/Auth";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Navigation() {

    const [openNav, setOpenNav] = useState<boolean>(false)

    const itemsNav = [
        {
            name: 'inicio',
            path: '/painel/'
        },
        {
            name: 'posts',
            path: '/painel/posts'
        },
        {
            name: 'importar',
            path: '/painel/posts/imports'
        },
        {
            name: 'sair',
            path: '/painel/posts/imports'
        }
    ]
    const handlerOpenNav = () => setOpenNav(prev => prev ? false : true);
    useEffect(() => {
        verifyToken();
        const interval = setInterval(verifyToken, 8000);
        return () => clearInterval(interval);
    }, [])
    const handlerLogout = async () => {
        const response = await logout();
        if (response.logout) redirect('/auth/login');
    }

    return (
        <header className={`bg-[#ED5684] min-h-[8vh] relative`}>
            <div className={`flex justify-center items-center h-[8vh] cursor-pointer overflow-hidden ${openNav && 'hidden'}`}>
                <div className="hover:scale-110" onClick={handlerOpenNav}>
                    <div className="bg-[#FFFFFF] h-[5px] w-[40px]"></div>
                    <div className="bg-[#FFFFFF] h-[5px] w-[40px] my-1"></div>
                    <div className="bg-[#FFFFFF] h-[5px] w-[40px]"></div>
                </div>
            </div>
            <nav className={`absolute bg-[#ED5684] w-screen h-screen ${!openNav && 'hidden'} z-10 `}>
                <div className="flex justify-center items-center min-h-[8vh]">
                    <p className="text-[#FFFFFf] border-1 px-2 rounded-full text-2xl cursor-pointer hover:scale-110" onClick={handlerOpenNav}>X</p>
                </div>
                <ul className='mx-auto h-[92vh] flex flex-col justify-center items-center  py-2 text-[#FFF] sm:w-[40%]'>
                    {itemsNav && itemsNav.map((element, index) => (
                        <Link onClick={() => { if (element.name === 'sair') handlerLogout(); handlerOpenNav() }} key={index} href={element.path} className="mb-5 text-2xl hover:scale-110">{(element.name.toUpperCase())}</Link>
                    ))}
                </ul>
            </nav>
        </header>

    )
}
