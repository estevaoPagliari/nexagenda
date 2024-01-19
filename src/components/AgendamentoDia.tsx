import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import { FaCalendarDay } from 'react-icons/fa6'

export function AgendamentoDia() {
  const horario = [
    { horario: '20/03 - 13:00', servico: 'Vago', cliente: 'Vago' },
    { horario: '20/03 - 14:00', servico: 'Vago', cliente: 'Vago' },
    { horario: '20/03 - 15:00', servico: 'Corte', cliente: 'Estevão' },
    { horario: '20/03 - 16:00', servico: 'Corte e Barba', cliente: 'Dudu' },
    { horario: '20/03 - 17:00', servico: 'Corte', cliente: 'Yuri' },
    { horario: '20/03 - 18:00', servico: 'Vago', cliente: 'Vago' },
    { horario: '20/03 - 19:00', servico: 'Barba', cliente: 'Flavio' },
    { horario: '20/03 - 20:00', servico: 'Barba', cliente: 'Erick' },
    { horario: '20/03 - 21:00', servico: 'Vago', cliente: 'Vago' },
  ]

  return (
    <div className="bg-slate-200/40 rounded-xl p-2 flex h-[600px] flex-col  items-center overflow-y-auto">
      <div className="flex flex-1 w-[430px] ">
        <h1 className="text-start font-semibold sm:text-lg md:text-xl border-b border-black/5 shadow-sm ml-2">
          Agendamento do Dia
        </h1>
        <div className="flex flex-1 justify-end items-center ">
          <FaCalendarDay size="25" />
          <h1 className="font-semibold sm:text-lg md:text-xl border-b border-black/5 shadow-sm ml-2">
            20/03/2023
          </h1>
        </div>
      </div>

      {horario?.map((horarios, i) => (
        <a
          href=""
          key={i}
          className="w-[430px] flex flex-row p-1 items-center rounded-lg gap-2 mt-2 bg-slate-200/50 hover:bg-slate-200"
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
