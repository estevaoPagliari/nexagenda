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
  // Chame a função Loaduser quando o componente for montado
  async function fetchUserData() {
    try {
      const data = await Loaduser() // Passe o userId para a função Loaduser
      setUserData(data)
      // setUserData(data)
    } catch (error) {
      // Trate erros, se necessário
      console.error('Erro ao carregar dados do usuário:', error)
    }
  }

  useEffect(() => {
    const diaAtual = new Date().getDate()
    const mesAtual = new Date().getMonth() + 1
    setDataSelecionada({ dia: diaAtual, mes: mesAtual })
    fetchUserData()
  }, [])

  const handleDataSelecionada = (data: { dia: number; mes: number }) => {
    setDataSelecionada(data)
  }

  return (
    <div>
      {userData?.id}
      <div className=" flex-col ml-16 sm:flex-row md:flex-row">
        <Welcome nome={userData?.nome || ''} />

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-2 p-1 mt-5">
          {/* Conteúdo da coluna 1 */}
          <Calendario onDataSelecionada={handleDataSelecionada} />
          {/* Conteúdo da coluna 2 */}

          {/* Conteúdo da coluna 3 */}
          <AgendadoDia dataSelecionada={dataSelecionada} id={userData?.id} />
        </div>
      </div>
    </div>
  )
}
