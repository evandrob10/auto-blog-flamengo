'use client';
import Image from "next/image";
import { Post } from "@/api/posts/interface";
import { posts as ListPost } from "@/api/posts"
import { useCallback, useEffect, useState } from "react";
import { verifyToken } from "@/api/Auth";
import { CreatePost } from "./CreatePost";

export default function Posts() {

    //Abrir config
    const [openPopUp, setOpenPopUp] = useState<boolean>(false);

    const [message, setMessage] = useState<string>();
    const [listPosts, setLisPosts] = useState<Post[]>();

    const updateListPost = useCallback(async () => {
        const user = await verifyToken();
        const update = user.userID && await ListPost(user.userID);
        if (update) setLisPosts(update);
        else setMessage('Error ao atualizar os posts!');
    }, [])

    useEffect(() => {
        updateListPost()
    }, [updateListPost])

    return (
        <section className="w-full bg-[#FFFFFF] xl:w-[1280px]">
            <CreatePost openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} />
            <section className="flex items-center justify-between relative mb-2 md:px-2 lg:px-4">
                <button  className="text-[18px] mb-2 mr-2 border-none bg-blue-600 w-[50px] h-[25px] rounded-full text-[#FFF] cursor-pointer" onClick={() => { setOpenPopUp(true) }}>+</button>
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
                            <div key={element.postFinallyID} className="border-1 border-[#cecbcbd1] rounded-[.3em] mb-2 sm:max-w-[48%] sm:mb-5 mx-[1%] p-2" >
                                <div className="float-right">
                                    <Image
                                        width={25}
                                        height={25}
                                        src={'/icons/edit.svg'}
                                        alt="Editar postagem"
                                        className="cursor-pointer hover:scale-120 mr-1"
                                    />
                                </div>
                                <Image
                                    width={1280}
                                    height={720}
                                    src={'/posts/tailwindcss-1633184775.jpg'}
                                    alt={element.title}
                                    className="w-full object-cover"
                                />
                                <h3 className="font-bold my-2">{element.title}</h3>
                                <p>{element.summary}</p>
                            </div>
                        ))}
                    </div> :
                    <p >Você não importou nenhum post!</p>}
            </section>

        </section>
    )
}