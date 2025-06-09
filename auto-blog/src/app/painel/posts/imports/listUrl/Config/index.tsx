'use client';
import { SetStateAction, useState } from 'react';
export default function Config({ webSiteClick , setWebSiteClick }: { webSiteClick: number, setWebSiteClick: React.Dispatch<SetStateAction<number | undefined>> }) {

  const [typeWaitLoadPage, setTypeWaitLoadPage] = useState<string>();


  return (
    <section className="w-[95%] flex flex-col items-center">
      <h1 className="mb-4">Configuração de importação</h1>
      <div className="w-[80%]">
        <h2 className="mb-3">Pagina:</h2>
        <div className="">
          <label htmlFor="loadPage">Tipo de espera:</label>
          <select name="" id="loadPage" className="w-full border-1 p-1 my-1" onChange={event => setTypeWaitLoadPage(event.target.value)}>
            <option value="">Selecione o seletor</option>
            <option value="selector">Tag, Class, ID</option>
            <option value="awaitNetLoad">Script Loads</option>
          </select>
          {typeWaitLoadPage && (typeWaitLoadPage === 'selector') && (
            <>
              <label htmlFor="seletor" className='w-[20%]'>Seletor:</label>
              <input id="seletor" className='my-1 py-1 px-2 border-1 w-[100%]' type='text' placeholder='Exemplo: ".class", "div", "#id"' />
            </>
          )}
        </div>
        <h2 className="my-3">Postagens:</h2>
        <div className="">
          <div>
            <label htmlFor="posts">Seletor postagens:</label>
            <input id="posts" className='my-2 py-1 px-2 border-1 w-[100%]' type='text' placeholder='Exemplo: ".class", "div", "#id"' />
          </div>
        </div>
        <h2 className="my-3">Conteúdo das postagens:</h2>
        <div className="">
          <div>
            <label htmlFor="title">Seletor titulo:</label>
            <input id="title" className='my-2 py-1 px-2 border-1 w-[100%]' type='text' placeholder='Exemplo: ".class", "div", "#id"' />
          </div>
          <div>
            <label htmlFor="content">Seletor conteúdo:</label>
            <input id="content" className='my-2 py-1 px-2 border-1 w-[100%]' type='text' placeholder='Exemplo: ".class", "div", "#id"' />
          </div>
        </div>
      </div>
      <div className='w-full mt-6 flex flex-col justify-center items-center'>
        <button type='button' className='w-[50%] text-[18px] mb-2 mr-2 border-none bg-blue-600 py-2 px-4 rounded-2xl text-[#FFF] cursor-pointer'>SALVAR</button>
        <button className='w-[50%] text-[18px] mb-2 mr-2 border-none bg-[#F1F1F1] py-2 px-4 rounded-2xl cursor-pointer' onClick={() => setWebSiteClick(undefined)}>VOLTAR</button>
      </div>
    </section>
  )
}
