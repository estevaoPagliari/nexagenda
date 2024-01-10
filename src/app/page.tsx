import { MenuSideBar } from '@/components/MenuSideBar'
import { Welcome } from '@/components/Welcome'

export default function Home() {
  return (
    <main className="h-screen flex ">
      <MenuSideBar />
      <div className="flex-1 flex-col ml-16 sm:flex-row md:flex-row">
        <Welcome />
        <div className="grid h-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 ">
          <div className="border ">Agendamento do Dia</div>
          <div className="border">Agendamento da Semana</div>
          <div className="border">Agendamento do Mês</div>
        </div>
      </div>
    </main>
  )
}
