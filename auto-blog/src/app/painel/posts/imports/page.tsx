'use client'
import { useState } from "react"
import ListUrl from "./listUrl"
import { urlType } from "@/api/urls/interface"
import Import from "./import"

export default function Imports() {
    const [webSite, setWebSite] = useState<urlType | undefined>(undefined)
    if (webSite) {
        return <Import website={webSite} setWebSite={setWebSite} />
    }
    return <ListUrl setWebSite={setWebSite} />
}

