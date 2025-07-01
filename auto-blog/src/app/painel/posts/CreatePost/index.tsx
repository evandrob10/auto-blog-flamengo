'use client';
import { Form } from '@/app/Components/pop-up';
import { useState } from 'react';
export function CreatePost({ openPopUp, setOpenPopUp }: { openPopUp: boolean, setOpenPopUp: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [callAction, setCallAction] = useState<string>('');
    const [targetAudience, setTargetAudience] = useState<string>('');
    const [toneOfVoice, setToneOfVoice] = useState<string>('');
    
    //Chave secundaria
    const [secondaryKeyword, setSecondaryKeyword] = useState<string>('');
    const [secondaryKeywords, setSecondaryKeywords] = useState<string[]>([]);

    function setItemArray() {
        setSecondaryKeyword(''); setSecondaryKeywords(prev => [...prev, secondaryKeyword])
    }

    function deleteItemArray(array: string[], index: number): string[] {
        return array.splice(index, index)
    }

    return (
        <Form title='GERADOR DE CONTEÚDO' openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} >
            <div className='w-full mb-4'>
                <h2 className='mb-1'>Público-alvo</h2>
                <input type="text" className='w-full py-1 px-2  border-1 border-[#bcbbbb] rounded-[.3em]' placeholder={`Ex: iniciantes, profissionais, curiosos, etc...`} />
            </div>
            <div className='w-full mb-4'>
                <h2 className='mb-1'>Tom de Voz</h2>
                <input type="text" className='w-full py-1 px-2  border-1 border-[#bcbbbb] rounded-[.3em]' placeholder={`Ex: informal, técnico, didático, inspirador, profissional, etc...`} />
            </div>
            <div className='w-full mb-4'>
                <h2 className='mb-1'>Call to Action (CTA)</h2>
                <input type="text" className='w-full py-1 px-2  border-1 border-[#bcbbbb] rounded-[.3em]' placeholder={`Ex: comentar, compartilhar, comprar, assinar, etc...`} />
            </div>
            <div className='w-full mb-4'>
                <h2 className='mb-1'>Links (opcional):</h2>
                <div className='flex'>
                    <input type="text" className='w-[90%] py-1 px-2 border-1 border-[#bcbbbb] rounded-[.3em] mr-3' placeholder={`Ex.:Links promocional`} value={secondaryKeyword ? secondaryKeyword : ''} onKeyDown={(event) => event.keyCode === 13 ? setItemArray() : ''} onChange={(event) => setSecondaryKeyword(event.target.value)} />
                    <button className="text-[#FFFFFf] bg-blue-600 rounded-[.3em] w-[50px] text-3xl cursor-pointer hover:scale-115" onClick={setItemArray} >+</button>
                </div>
                {
                    secondaryKeywords.length ? <div className='flex flex-wrap border-1 border-[#bcbbbb] mt-3 w-[90%] z-50 py-2 rounded-[.3em]'>
                        {
                            secondaryKeywords.map((el, index) => (
                                <div key={index} className='mx-2 flex p-[2px] px-2 items-center border-1 rounded-[.3em]'>
                                    <p>{el}</p>
                                    <button type='button' className='ml-2 cursor-pointer' onClick={() => setSecondaryKeywords(deleteItemArray(secondaryKeywords, index))}>x</button>
                                </div>
                            ))
                        }
                    </div> : ''
                }

            </div>
            <div className='w-full mb-4'>
                <h2 className='mb-1'>Palavras-chave secundárias (opcional):</h2>
                <div className='flex'>
                    <input type="text" className='w-[90%] py-1 px-2 border-1 border-[#bcbbbb] rounded-[.3em] mr-3' placeholder={`Palavras-chave relacionadas ao tema`} value={secondaryKeyword ? secondaryKeyword : ''} onKeyDown={(event) => event.keyCode === 13 ? setItemArray() : ''} onChange={(event) => setSecondaryKeyword(event.target.value)} />
                    <button className="text-[#FFFFFf] bg-blue-600 w-[50px] rounded-[.3em] text-3xl cursor-pointer hover:scale-115" onClick={setItemArray} >+</button>
                </div>
                {
                    secondaryKeywords.length ? <div className='flex flex-wrap border-1 border-[#bcbbbb] mt-3 w-[90%] z-50 py-2 rounded-[.3em]'>
                        {
                            secondaryKeywords.map((el, index) => (
                                <div key={index} className='mx-2 flex p-[2px] px-2 items-center border-1 rounded-[.3em]'>
                                    <p>{el}</p>
                                    <button type='button' className='ml-2 cursor-pointer' onClick={() => setSecondaryKeywords(deleteItemArray(secondaryKeywords, index))}>x</button>
                                </div>
                            ))
                        }
                    </div> : ''
                }
            </div>
            <div className='my-5'>
                <button className='text-[18px] mb-2 mr-2 border-none bg-blue-600 py-2 px-4 rounded-2xl text-[#FFF] cursor-pointer'>GERAR</button>
            </div>
        </Form>

    )
}