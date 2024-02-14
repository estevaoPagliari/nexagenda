'use client'
import { AgendamentoDia } from '@/components/AgendamentoDia'
import { MenuSideBar } from '@/components/MenuSideBar'
import { Welcome } from '@/components/Welcome'
import { Calendario } from '@/components/Calendario'
import { AgendadoDia } from '@/components/AgendadoDia'
import { useEffect, useState } from 'react'

export default function Home() {
  const [dataSelecionada, setDataSelecionada] = useState<{
    dia: number
    mes: number
  } | null>(null)

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
    </div>
  )
}
