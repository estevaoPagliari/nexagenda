import { AgendamentoDia } from '@/components/AgendamentoDia'
import { AgendamentoMes } from '@/components/AgendamentoMes'
import { MenuSideBar } from '@/components/MenuSideBar'
import { Welcome } from '@/components/Welcome'
import { FaCalendarAlt } from 'react-icons/fa'
import Link from 'next/link'
import { Calendario } from '@/components/Calendario'
import { Relogio } from '@/components/Relogio'
import { CalendarioMenu } from '@/components/CalendarioMenu'

export default function Home() {
  return (
    <main className="h-screen flex ">
      <MenuSideBar />

      <div className="flex-1 flex-col ml-16 sm:flex-row md:flex-row">
        <div className='flex flex-row p-2'>
        <Welcome />
        <Relogio/>
        </div>
        
        <div className="grid  md:grid-cols-1 lg:grid-cols-3 gap-4 p-1">
          {/* Conteúdo da coluna 1 */}
          <AgendamentoDia />

          {/* Conteúdo da coluna 2 */}
          <AgendamentoMes />

          {/* Conteúdo da coluna 3 */}
          <Calendario />
        </div>
        
      </div>
    </main>
  )
}
