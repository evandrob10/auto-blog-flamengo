'use client';
import { getAllUrl } from "@/api/urls";
import { urlType } from "@/api/urls/interface";
import { useCallback, useEffect, useState } from "react";
import { listUrlType } from "./interface";

export default function ListUrl({ setWebSite }: listUrlType) {
    const [allUrl, setAllUrl] = useState<urlType[]>()

    const getAllUrls = useCallback(async () => {
        const allListUrl: urlType[] = await getAllUrl();
        if (allListUrl) setAllUrl(allListUrl);
    }, [])

    useEffect(() => {
        getAllUrls();
    }, [getAllUrls])

    return (
        <section className="w-[95%]">
            <table className="text-center text-[16px] w-full">
                <caption className="py-2">LISTA DE URL DE IMPORTAÇÃO</caption>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody className="text-[14px]">
                    {allUrl && allUrl.map((element) => (
                        <tr key={element.websiteID}>
                            <td >{element.websiteID}</td>
                            <td >{element.urlwebsite}</td>
                            <td >
                                <button className="bg-blue-500 text-[#FFF] py-1 px-2 rounded-3xl" onClick={() => setWebSite(element)}>Abrir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}
