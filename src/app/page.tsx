import { AgendamentoDia } from '@/components/AgendamentoDia'
import { AgendamentoMes } from '@/components/AgendamentoMes'
import { MenuSideBar } from '@/components/MenuSideBar'
import { Welcome } from '@/components/Welcome'
import { FaCalendarAlt } from 'react-icons/fa'
import Link from 'next/link'
import { Calendario } from '@/components/Calendario'

export default function Home() {
  return (
    <main className="h-screen flex ">
      <MenuSideBar />

      <div className="flex-1 flex-col ml-16 sm:flex-row md:flex-row">
        <Welcome />
        <div className="grid  md:grid-cols-1 lg:grid-cols-3 gap-4 p-4">
          {/* Conteúdo da coluna 1 */}
          <AgendamentoDia />

          {/* Conteúdo da coluna 2 */}
          <AgendamentoMes />

          {/* Conteúdo da coluna 3 */}
          <div className="bg-slate-200/40 rounded-xl p-4 flex flex-col justify-center items-center overflow-y-auto">
            <Calendario />
          </div>
        </div>
      </div>
    </main>
  )
}
