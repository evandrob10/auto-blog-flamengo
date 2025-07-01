'use client';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
//interfaces:
import { webConfig } from '@/api/web/interface';
import { createWebConfig, deleteWebSite, getWebConfig, updateWebConfig } from '@/api/web';
import Message from '@/app/painel/Components/Message';
import { Form } from '@/app/Components/pop-up';

export default function Config({ webSiteClick, setWebSiteClick, openPopUp, setOpenPopUp }: { webSiteClick: number, setWebSiteClick: React.Dispatch<SetStateAction<number | undefined>>, openPopUp: boolean, setOpenPopUp: React.Dispatch<React.SetStateAction<boolean>> }) {

  const [message, setMessage] = useState<string>('');
  const [configExist, setConfigExist] = useState<boolean>(false);
  const [webConfig, setWebConfig] = useState<webConfig>({
    typeAwaitLoad: '',
    selectAwaitLoad: '',
    selectorPosts: '',
    selectorTitle: '',
    selectorContent: '',
    selectorDateTime: null,
    websiteID: webSiteClick,
  })

  //Pega configuração ja salva:
  const config = useCallback(async () => {
    const config: webConfig[] = await getWebConfig(webSiteClick);
    if (config[0]?.webConfigID) {
      setWebConfig(config[0]);
      setConfigExist(true);
    }
  }, [webSiteClick])
  //Salva config: 
  const saveConfig = async () => {
    if (webConfig) {
      const config: webConfig = await createWebConfig(webConfig);
      setWebConfig(config);
    }
  }
  //Atualizar configuração:
  const updateConfig = async () => {
    if (webConfig) {
      const config: webConfig = await updateWebConfig(webSiteClick, webConfig);
      setWebConfig(config);
    }
  }

  const validConfig = () => {
    if (webConfig) {
      if (!webConfig.typeAwaitLoad) return setMessage('Você esqueceu de selecionar o tipo de espera!');
      if (webConfig.typeAwaitLoad === 'selector' && !webConfig.selectAwaitLoad) return setMessage('Você esqueceu preencher o seletor esperado!');
      if (!webConfig.selectorPosts) return setMessage('Faltou dizer o seletor dos posts');
      if (!webConfig.selectorTitle) return setMessage('Faltou dizer o seletor do titulo.');
      if (!webConfig.selectorContent) return setMessage('Faltou dizer o seletor do conteudo.');
    }

    if (configExist) updateConfig()
    else saveConfig();
    setOpenPopUp(false)
  }

  const deleteWeb = async () => {
    const response = await deleteWebSite(webSiteClick);
    if (response) setWebSiteClick(undefined);
  }

  useEffect(() => {
    config();
  }, [config])


  return (
    <Form title='Configuração de importação' openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} >
      <div className="w-[90%]">
        <div className='w-full flex justify-between items-center mb-5'>
          <h2>Pagina:</h2>
          {webSiteClick &&
            <button className='float-right mr-1 bg-[#ED5684] px-2 rounded-2xl text-[#FFFF] hover:scale-110 cursor-pointer' onClick={deleteWeb}>deletar</button>
          }
        </div>
        <label htmlFor="loadPage">Tipo de espera:</label>
        <select name="" id="loadPage" value={webConfig?.typeAwaitLoad ? webConfig?.typeAwaitLoad : ''} onChange={event => setWebConfig(prev => prev ? ({ ...prev, typeAwaitLoad: event.target.value as string }) : prev)} className="w-full border-1 p-1 my-1">
          <option value="">Selecione o seletor</option>
          <option value="selector">Tag, Class, ID</option>
          <option value="awaitNetLoad">Script Loads</option>
        </select>
        {webConfig && (webConfig?.typeAwaitLoad === 'selector') && (
          <>
            <label htmlFor="seletor" className='w-[20%]'>Seletor:</label>
            <input id="seletor" value={webConfig?.selectAwaitLoad ? webConfig?.selectAwaitLoad : ''} onChange={event => setWebConfig(prev => prev ? ({ ...prev, selectAwaitLoad: event.target.value as string }) : prev)} className='my-1 py-1 px-2 border-1 w-[100%]' type='text' placeholder='Exemplo: ".class", "div", "#id"' />
          </>
        )}
        <h2 className="my-3">Postagens:</h2>
        <div className="">
          <div>
            <label htmlFor="posts">Seletor postagens:</label>
            <input id="posts" value={webConfig?.selectorPosts ? webConfig?.selectorPosts : webConfig?.selectorPosts} onChange={event => setWebConfig(prev => prev ? ({ ...prev, selectorPosts: event.target.value as string }) : prev)} className='my-2 py-1 px-2 border-1 w-[100%]' type='text' placeholder='Exemplo: ".class", "div", "#id"' />
          </div>
        </div>
        <h2 className="my-3">Conteúdo das postagens:</h2>
        <div className="">
          <div>
            <label htmlFor="title">Seletor titulo:</label>
            <input id="title" value={webConfig?.selectorTitle ? webConfig?.selectorTitle : ''} onChange={event => setWebConfig(prev => prev ? ({ ...prev, selectorTitle: event.target.value as string }) : prev)} className='my-2 py-1 px-2 border-1 w-[100%]' type='text' placeholder='Exemplo: ".class", "div", "#id"' />
          </div>
          <div>
            <label htmlFor="content">Seletor conteúdo:</label>
            <input id="content" value={webConfig?.selectorContent ? webConfig?.selectorContent : webConfig?.selectorContent} onChange={event => setWebConfig(prev => prev ? ({ ...prev, selectorContent: event.target.value as string }) : prev)} className='my-2 py-1 px-2 border-1 w-[100%]' type='text' placeholder='Exemplo: ".class", "div", "#id"' />
          </div>
          <div>
            <label htmlFor="content">Seletor data:</label>
            <input id="content" value={webConfig?.selectorDateTime ? webConfig?.selectorDateTime : ''} onChange={event => setWebConfig(prev => prev ? ({ ...prev, selectorDateTime: event.target.value as string }) : prev)} className='my-2 py-1 px-2 border-1 w-[100%]' type='text' placeholder='Exemplo: ".class", "div", "#id". (opcional)' />
          </div>
        </div>
        <Message msg={message} />
        <div className='w-full my-6 flex flex-col justify-center items-center'>
          <button type='button' className='w-[50%] text-[18px] border-none bg-blue-600 py-2 px-4 rounded-2xl text-[#FFF] cursor-pointer' onClick={event => { event.preventDefault(); validConfig() }}>SALVAR</button>
        </div>
      </div>

    </Form>

  )
}
