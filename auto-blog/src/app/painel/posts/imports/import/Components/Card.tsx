import Image from "next/image"

export default function Card({ text, quantity, extract, dLinksPending }: { text: string, quantity: number, extract?: () => void, dLinksPending?: () => void }) {
    return (
        <div className='mb-3 '>
            <h2 className='mb-2 xl:mb-4'>{text}</h2>
            <div className="relative text-[#000] bg-[#F1F1F1] mx-auto text-4xl w-[20vh] h-[10vh] flex items-center justify-center rounded-2xl">
                {text.includes('LINKS') &&
                    <Image
                        width={15}
                        height={10}
                        alt=""
                        src={`/icons/refresh-svgrepo-com.svg`}
                        className="absolute top-2 right-3 cursor-pointer hover:scale-110"
                        onClick={extract}
                    />
                }
                {text.includes('PENDENTE') &&
                    <Image
                        width={15}
                        height={10}
                        alt=""
                        src={`/icons/delete-svgrepo-com.svg`}
                        className="absolute top-2 right-3 cursor-pointer hover:scale-110"
                        onClick={dLinksPending}
                    />
                }
                <p>{quantity}</p>
            </div>
        </div>
    )
} 