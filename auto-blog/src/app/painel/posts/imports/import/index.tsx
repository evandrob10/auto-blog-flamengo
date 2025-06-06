'use client';
import { PostsType } from '@/api/posts/interface';
import { newPosts } from '@/api/posts/interface';
import { updatePosts as update, getAllPosts as posts } from "@/api/posts";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import Card from './Components/Card';
import { urlType } from '@/api/urls/interface';

type WebSite = {
    website: urlType
    setWebSite: React.Dispatch<SetStateAction<urlType | undefined>>
}

export default function Import({ website, setWebSite }: WebSite) {
    const [message, setMessage] = useState<string>('');
    const [extractData, setExtractData] = useState<boolean>(false);
    const [quantityPosts, setQuantityPosts] = useState<number>(0);
    const [quantityPostCollect, setQuantityPostCollect] = useState<number>(0);
    const [quantityPostsPending, setQuantityPostsPending] = useState<number>(0);

    const getAllPosts = useCallback(async () => {
        const AllPosts: PostsType[] = await posts(`${website.websiteID}`);
        if (website) setQuantityPostsPending(0);
        if (AllPosts) {
            setQuantityPosts(AllPosts.length);
            for (const Post of AllPosts) {
                if (!Post.postCollect) setQuantityPostsPending(prev => prev + 1);
            }
        }
    }, [website])

    const zerarQuantity = useCallback(() => {
        setQuantityPosts(0); // Zerar ao recarregar item 
        setQuantityPostsPending(0); // Zerar ao recarregar item 
    }, [])

    const updatePosts = useCallback(() => {
        getAllPosts(); // pegar posts
        zerarQuantity();
    }, [getAllPosts, zerarQuantity])

    useEffect(() => {
        setQuantityPostCollect(quantityPosts - quantityPostsPending);
    }, [quantityPosts, quantityPostsPending])

    useEffect(() => {
        updatePosts();
    }, [updatePosts])

    async function extract() {
        setExtractData(true);
        setMessage('');
        const newPosts: newPosts[] = await update();
        if (newPosts.length > 0) {
            console.log(newPosts);
            updatePosts();
            setMessage(`Foram extraido ${newPosts.length} posts com sucesso!`)
        }
        else setMessage('Error ao tentar extrair os posts!');
        setExtractData(false);
    }

    return (
        <div className=' xl:w-[50%] xl:h-screen'>
            <div className="text-center text-[16px] xl:flex xl:flex-col xl:justify-evenly xl:h-[50%]">
                <h2 className="text-[#000] mb-5">URL: {website.urlwebsite}</h2>
                <div className="flex flex-col items-center justify-center xl:mx-auto xl:flex-row xl:w-[80%] xl:justify-evenly">
                    <Card quantity={quantityPosts} text='TOTAL LINKS' />
                    <Card quantity={quantityPostCollect} text='QUANTIDADE POSTS COLETADOS' />
                    <Card quantity={quantityPostsPending} text='QUANTIDADE PENDENTE' />
                </div>
                {message &&
                    <div>
                        <p className='my-4 py-3 rounded-2xl text-[#FFF] w-[80%] mx-auto' style={message.includes('Error') ? { backgroundColor: 'red' } : { backgroundColor: 'green' }}>{message}</p>
                    </div>
                }
                <div className="mt-6 flex flex-col justify-center items-center">
                    {quantityPostsPending !== 0 && (extractData ? <p className='animate-ping'>Carregando...</p> : <button onClick={extract} className={`w-[40%] mb-3 border-none bg-blue-600 py-2 px-6 rounded-[.2em] text-[#FFF] cursor-pointer`}>UPDATE</button>)}
                    <button className='w-[40%] border-none bg-[#F1F1F1] py-2 px-6 rounded-[.2em] cursor-pointer' onClick={() => setWebSite(undefined)}>VOLTAR</button>
                </div>
            </div>
        </div>
    )
}
