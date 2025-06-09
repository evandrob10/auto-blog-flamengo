import { urlType } from "@/api/urls/interface";

export interface listUrlType{
    setGetlink: React.Dispatch<React.SetStateAction<boolean | 'error'>> 
    setWebSite: React.Dispatch<React.SetStateAction<urlType | undefined>> 
}