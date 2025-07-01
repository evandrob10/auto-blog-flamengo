export function Form({ children, title, openPopUp, setOpenPopUp }: { children: React.ReactNode, title: string, openPopUp: boolean, setOpenPopUp: React.Dispatch<React.SetStateAction<boolean>>}) {
    return (
        <section className={`absolute top-0 right-0 bg-[#00000093] w-[100%] h-[100%] z-30 ${openPopUp ? '' : 'hidden'}`}>
            <section className='poup-config absolute top-[50%] left-[50%] w-[90%] z-10 bg-[#FFFF] border-1 border-[#f1f1f1] p-2  sm:max-w-[500px] rounded-[.3em]'>
                <div className='w-[95%] mx-auto'>
                    <div className="flex justify-between items-center min-h-[8vh] mr-2 mb-3">
                        <h2 className='text-2xl'>{title}</h2>
                        <p className="text-[#ED5684] border-1 border-[#ED5684] px-2 rounded-full text-2xl cursor-pointer hover:scale-110" onClick={()=> setOpenPopUp(false)}>X</p>
                    </div>
                    <div className='flex flex-col justify-center items-center '>
                        {children}
                    </div>
                </div>
            </section >
        </section>
    )
}