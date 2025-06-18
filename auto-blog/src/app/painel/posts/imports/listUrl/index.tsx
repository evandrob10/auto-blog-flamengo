'use client';
import { useCallback, useEffect, useState } from "react";
//Componentes
import Config from "./Config";
import Image from "next/image";
//Api
import { getAllUrl } from "@/api/urls";
//Interface
import { listUrlType } from "./interface";
import { urlType } from "@/api/urls/interface";
import { addWebSite } from "@/api/web";
import { verifyToken } from "@/api/Auth";

export default function ListUrl({ setWebSite }: listUrlType) {
    const [openInputUrl, setOpenInputUrl] = useState<boolean>(false);
    const [allUrl, setAllUrl] = useState<urlType[]>();
    const [url, setUrl] = useState<string>();
    const [webSiteClick, setWebSiteClick] = useState<number | undefined>()

    const getAllUrls = useCallback(async () => {
        const user = await verifyToken();
        const allListUrl: urlType[] = user.userID ? await getAllUrl(user.userID) : [];
        if (allListUrl) setAllUrl(allListUrl);
    }, [])

    const addUrl = async () => {
        const user = await verifyToken();
        if (url) {
            const response = await addWebSite(user.userID, url);
            if (response && user.userID) getAllUrls();
        }
        setUrl('');
        setOpenInputUrl(false);
    }

    useEffect(() => {
        getAllUrls();
    }, [getAllUrls, webSiteClick])

    async function openImports(element: urlType) {
        setWebSite(element);
    }

    if (webSiteClick) return <Config webSiteClick={webSiteClick} setWebSiteClick={setWebSiteClick} />
    return (
        <section className="w-full flex flex-col items-center">
            <table className="text-center text-[16px] w-full sm:w-[90%] lg:w-[80%] xl:w-[60%]">
                <caption className="mb-3">
                    <div className="flex justify-between items-center">
                        <h1 className="py-2 mb-2 font-bold inline-block">LISTA DE URL:</h1>
                        <button className={`mr-3 text-[12px] bg-blue-500 text-[#FFF] py-1 px-3 rounded-3xl cursor-pointer`} onClick={() => setOpenInputUrl(prev => prev ? false : true)}>+</button>
                    </div>
                    {openInputUrl &&
                        <div>
                            <input onChange={event => setUrl(event.target.value)} className='my-1 py-1 px-2 border-1 w-[75%] mr-1 mb-3' type="text" value={url ? url : ''}/>
                            <button type="button" className="text-[12px] bg-blue-500 text-[#FFF] py-1 px-2 rounded-3xl cursor-pointer" onClick={addUrl}>ADICIONAR</button>
                        </div>
                    }
                </caption>
                <thead className="border-b-2">
                    <tr>
                        <th>ID</th>
                        <th>URL</th>
                        <th colSpan={2}>AÇÕES</th>
                    </tr>
                </thead>
                <tbody className="text-[14px]">
                    {allUrl && allUrl.map((element) => {
                        return (
                            <tr key={element.websiteID} >
                                <td >{element.websiteID}</td>
                                <td >{element.urlwebsite.slice(0,35)}</td>
                                <td >
                                    <button className={`mr-2 text-[12px] bg-blue-500 text-[#FFF] py-1 px-2 rounded-3xl cursor-pointer`} onClick={() => openImports(element)}>Abrir</button>
                                </td>
                                <td>
                                    <Image
                                        width={20}
                                        height={20}
                                        src={'/img/engrenagem.png'}
                                        alt="Configuração url"
                                        className="py-3 cursor-pointer"
                                        onClick={() => setWebSiteClick(element.websiteID)}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}
