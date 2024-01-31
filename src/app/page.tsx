import { AgendamentoDia } from '@/components/AgendamentoDia'
import { AgendamentoMes } from '@/components/AgendamentoMes'
import { MenuSideBar } from '@/components/MenuSideBar'
import { Welcome } from '@/components/Welcome'
import { Calendario } from '@/components/Calendario'
import { ModalCliente } from '@/components/ModalCliente'

export default function Home() {
  return (
    <main className="h-screen flex ">
      <MenuSideBar />

      <div className="flex-1 flex-col ml-16 sm:flex-row md:flex-row">
        <Welcome />

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
