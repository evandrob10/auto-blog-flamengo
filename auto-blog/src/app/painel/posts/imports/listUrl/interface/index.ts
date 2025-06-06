import { urlType } from "@/api/urls/interface";

export interface listUrlType{
    setWebSite: React.Dispatch<React.SetStateAction<urlType | undefined>> 
}