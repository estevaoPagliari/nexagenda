'use client'
import { AgendamentoDia } from '@/components/AgendamentoDia'
import { MenuSideBar } from '@/components/MenuSideBar'
import { Welcome } from '@/components/Welcome'
import { Calendario } from '@/components/Calendario'
import { AgendadoDia } from '@/components/AgendadoDia'
import { useEffect, useState } from 'react'
import { Loaduser } from '@/api/userestabelecimento'
import { userEstabelecimento } from '../api/interface/InterUserEstabelecimento'

export default function Home() {
  const [dataSelecionada, setDataSelecionada] = useState<{
    dia: number
    mes: number
  } | null>(null)

  const [userData, setUserData] = useState<userEstabelecimento | null>(null)

  useEffect(() => {
    // Chame a função Loaduser quando o componente for montado
    async function fetchUserData() {
      try {
        const data = await Loaduser() // Passe o userId para a função Loaduser
        setUserData(data)
        console.log(data)
        // setUserData(data)
      } catch (error) {
        // Trate erros, se necessário
        console.error('Erro ao carregar dados do usuário:', error)
      }
    }

    fetchUserData() // Chame a função fetchUserData
  }, []) // Re-renderize o componente sempre que userId mudar

  useEffect(() => {
    const diaAtual = new Date().getDate()
    const mesAtual = new Date().getMonth() + 1
    setDataSelecionada({ dia: diaAtual, mes: mesAtual })
  }, [])

  const handleDataSelecionada = (data: { dia: number; mes: number }) => {
    setDataSelecionada(data)
  }

  return (
    <div>
      <MenuSideBar />

      <div className=" flex-col ml-16 sm:flex-row md:flex-row">
        <Welcome />

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-2 p-1 mt-5">
          {/* Conteúdo da coluna 1 */}
          <Calendario onDataSelecionada={handleDataSelecionada} />
          {/* Conteúdo da coluna 2 */}

          {/* Conteúdo da coluna 3 */}
          <AgendadoDia dataSelecionada={dataSelecionada} />
        </div>
      </div>
      <div className="ml-28">
        {/* Exibe os dados do usuário, se disponíveis */}
        {userData ? (
          <div>
            <h2>Dados do usuário</h2>
            <p>CPF: {userData.cpf}</p>
            <p>Nome: {userData.nome}</p>
            <p>Email: {userData.email}</p>{' '}
            {/* Corrigido de "Email.:" para "Email:" */}
            {/* Adicione outros campos conforme necessário */}
          </div>
        ) : (
          <p>Dados do usuário não disponíveis</p>
        )}
      </div>
    </div>
  )
}
