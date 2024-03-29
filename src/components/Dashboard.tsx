'use client'
import { Calendario } from '@/components/Calendario'
import { AgendadoDia } from '@/components/AgendadoDia'
import { useEffect, useState } from 'react'
import { Loaduser } from '@/api/userestabelecimento'
import { userEstabelecimento } from '@/api/interface/InterUserEstabelecimento'
export function Dashboard({ id }: { id: number }) {
  const [dataSelecionada, setDataSelecionada] = useState<{
    dia: number
    mes: number
  } | null>(null)

  const [userData, setUserData] = useState<userEstabelecimento | null>(null)
  // Chame a função Loaduser quando o componente for montado
  async function fetchUserData() {
    try {
      let idString = ''
      if (id !== null) {
        idString = id.toString()
      }
      const data = await Loaduser(idString) // Passe o userId para a função Loaduser
      setUserData(data)
      // console.log(data)
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
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-2 p-1 mt-5">
        {/* Conteúdo da coluna 1 */}
        <Calendario onDataSelecionada={handleDataSelecionada} />
        {/* Conteúdo da coluna 2 */}

        {/* Conteúdo da coluna 3 */}
        <AgendadoDia dataSelecionada={dataSelecionada} id={id} />
      </div>
    </div>
  )
}
