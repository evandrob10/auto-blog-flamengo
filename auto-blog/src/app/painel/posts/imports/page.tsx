'use client'

import { useState } from "react"
import ListUrl from "./listUrl"
import { urlType } from "@/api/urls/interface"
import Import from "./import"

export default function Imports() {
    const [getlink, setGetlink] = useState<boolean | 'error'>(false);
    const [webSite, setWebSite] = useState<urlType | undefined>(undefined)
    if (webSite) {
        if (getlink) return <Import website={webSite} setWebSite={setWebSite} setGetlink={setGetlink}/>
        else if (typeof getlink === 'string') return <p className="animate-pulse">Ocorreu um error ao carregar os links!</p>
        else return <p className="animate-pulse">Carregando links!</p>
    }
    return <ListUrl setWebSite={setWebSite} setGetlink={setGetlink} />
}

