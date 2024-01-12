import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'

export function AgendamentoDia() {
  const horario = [
    { horario: '20/03 - 15:00', servico: 'Corte', cliente: 'Estevão' },
    { horario: '20/03 - 16:00', servico: 'Corte e Barba', cliente: 'Dudu' },
    { horario: '20/03 - 17:00', servico: 'Corte', cliente: 'Yuri' },
    { horario: '20/03 - 18:00', servico: 'Vago', cliente: 'Vago' },
    { horario: '20/03 - 19:00', servico: 'Barba', cliente: 'Flavio' },
    { horario: '20/03 - 20:00', servico: 'Barba', cliente: 'Erick' },
    { horario: '20/03 - 21:00', servico: 'Vago', cliente: 'Vago' },
  ]

  return (
    <div className="bg-slate-200/40 rounded-xl p-2 flex h-[500px] flex-col  items-center overflow-y-auto">
      <h1 className="text-center font-semibold sm:text-lg md:text-xl border-b border-black/5 shadow-sm ">
        Agendamento do Dia
      </h1>
      {horario?.map((horarios, i) => (
        <a
          href=""
          key={i}
          className="   md:w-[430px] h-auto  flex flex-row p-1 items-center rounded-lg gap-4 mt-2 bg-slate-200/50 hover:bg-slate-200"
        >
          <div className="ml-1">
            <FaCalendarAlt size={30} />
          </div>
          <div className="flex-1 flex-col text-center p-1 font-bold text-xs border-x border-slate-500/40">
            <p className="">{horarios?.horario}</p>
            <p>Serviço - {horarios?.servico}</p>
          </div>
          <div className="flex-1 flex-col text-center p-1 font-bold  border-r ">
            <p className="">Cliente :</p>
            <p>{horarios?.cliente}</p>
          </div>
        </a>
      ))}
    </div>
  )
}
