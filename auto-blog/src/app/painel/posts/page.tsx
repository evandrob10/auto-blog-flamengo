'use client';
import { Post } from "@/api/posts/interface";
import { generationPosts, posts as ListPost } from "@/api/posts"
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Posts() {

    const [message, setMessage] = useState<string>();
    const [listPosts, setLisPosts] = useState<Post[]>();

    const updateListPost = useCallback(async () => {
        const update = await ListPost();
        if (update) setLisPosts(update);
        else setMessage('Error ao atualizar os posts!');
    }, [])

    const createPost = async () => {
        setMessage('');
        const { quantity } = await generationPosts();
        if (quantity) {
            await updateListPost();
            setMessage(`Foram adicionado ${quantity} com sucesso!.`);
        }
        else setMessage('Error ao criar os posts');
    }

    useEffect(() => {
        updateListPost()
    }, [updateListPost])

    return (
        <section className="w-[95%]">
            <section className="text-center">
                <h1 className="py-2">POSTAGENS</h1>
            </section>
            <div className="w-[100%] h-[10%] flex justify-center items-center">
                <button onClick={createPost} className="text-[14px] mb-2 mr-2 border-none bg-blue-600 py-2 px-3 rounded-[.2em] text-[#FFF] cursor-pointer">CRIAR POST</button>
                <Link href={'/painel/posts/imports'}>
                    <button className="text-[14px] mb-2 mr-2 border-none bg-blue-600 py-2 px-3 rounded-[.2em] text-[#FFF] cursor-pointer">IMPORTAR POSTS</button>
                </Link>
            </div>
            {message &&
                <p className='text-center mb-5 py-3 rounded-2xl text-[#FFF] w-[80%] mx-auto xl:w-[30%]' style={message.includes('Error') ? { backgroundColor: 'red' } : { backgroundColor: 'green' }}>{message}</p>
            }
            <section className="min-h-[50%] flex justify-center items-center">
                {listPosts && listPosts.length ?
                    <div className="self-start">
                        {listPosts.map((element) => (
                            <div key={element.postFinallyID} className="border-1">
                                <h3 className="font-bold">{element.title}</h3>
                                <p>{element.summary}</p>
                            </div>
                        ))}
                    </div> :
                    <p >Você não importou nenhum post!</p>}
            </section>

        </section>
    )
}