export default function Card({ text, quantity }: { text: string, quantity: number}) {
    return (
        <div className='mb-3'>
            <h2 className='mb-2 xl:mb-4'>{text}</h2>
            <div className="text-[#000] bg-[#F1F1F1] mx-auto text-4xl w-[20vh] h-[10vh] flex items-center justify-center rounded-2xl">
                <p>{quantity}</p>
            </div>
        </div>
    )
} 