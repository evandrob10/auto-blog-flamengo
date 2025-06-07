'use client';
import Image from "next/image";
import { Post } from "@/api/posts/interface";
import { generationPosts, posts as ListPost } from "@/api/posts"
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
            <section className="flex items-center justify-between relative mb-2 p-4">
                <button onClick={createPost} className="text-[18px] mb-2 mr-2 border-none bg-blue-600 w-[50px] h-[25px] rounded-full text-[#FFF] cursor-pointer">+</button>
                <h1 className="py-2">POSTAGENS</h1>
                <div>
                    <Image
                        width={20}
                        height={20}
                        src={'/img/engrenagem.png'}
                        alt="Configuração url"
                        className="align-middle py-3 cursor-pointer"
                    />
                </div>
            </section>
            {message &&
                <p className='text-center mb-5 py-3 rounded-2xl text-[#FFF] w-[80%] mx-auto xl:w-[30%]' style={message.includes('Error') ? { backgroundColor: 'red' } : { backgroundColor: 'green' }}>{message}</p>
            }
            <section className="min-h-[50%] flex justify-center items-center">
                {listPosts && listPosts.length ?
                    <div className="self-start flex flex-wrap">
                        {listPosts.map((element) => (
                            <div key={element.postFinallyID} className="border-1 mb-2 sm:max-w-[48%] mx-[1%] p-2" >
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