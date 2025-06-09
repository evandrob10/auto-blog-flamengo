'use client';
import { getAllUrl } from "@/api/urls";
import { urlType } from "@/api/urls/interface";
import { useCallback, useEffect, useState } from "react";
import { listUrlType } from "./interface";
import Image from "next/image";
import Config from "./Config";
import { updateLinks } from "@/api/links";

export default function ListUrl({ setWebSite, setGetlink }: listUrlType) {
    const [allUrl, setAllUrl] = useState<urlType[]>()
    const [webSiteClick, setWebSiteClick] = useState<number | undefined>()

    const getAllUrls = useCallback(async () => {
        const allListUrl: urlType[] = await getAllUrl();
        if (allListUrl) setAllUrl(allListUrl);
    }, [])

    useEffect(() => {
        getAllUrls();
    }, [getAllUrls])

    async function openImports(element: urlType) {
        setWebSite(element);
        const response: boolean = await updateLinks(element);
        if (response) setGetlink(true);
        else setGetlink('error');
    }

    if (webSiteClick) return <Config webSiteClick={webSiteClick} setWebSiteClick={setWebSiteClick} />
    return (
        <section className="w-[95%] flex flex-col items-center">
            <table className="text-center text-[16px] w-full sm:w-[90%] lg:w-[80%] xl:w-[60%]">
                <caption>
                    <h1 className="py-2 mb-3 text-start font-bold">LISTA DE URL:</h1>
                </caption>
                <thead className="border-b-2">
                    <tr>
                        <th>ID</th>
                        <th>URL</th>
                        <th colSpan={2}>AÇÕES</th>
                    </tr>
                </thead>
                <tbody className="text-[14px]">
                    {allUrl && allUrl.map((element) => (
                        <tr key={element.websiteID} >
                            <td >{element.websiteID}</td>
                            <td >{element.urlwebsite}</td>
                            <td >
                                <button className="mr-2 text-[12px] bg-blue-500 text-[#FFF] py-1 px-2 rounded-3xl cursor-pointer" onClick={() => openImports(element)}>Abrir</button>
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
                    ))}
                </tbody>
            </table>
        </section>
    )
}
