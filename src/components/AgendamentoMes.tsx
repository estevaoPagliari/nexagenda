'use client'
import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'

export function AgendamentoMes() {
  const semana = [
    { semana: 'Segunda-Feira', vago: false, disponivel: 'Estevão' },
    { semana: 'Terça-Feira', vago: true, cliente: 'Dudu' },
    { semana: 'Quarta-Feira', vago: false, cliente: 'Yuri' },
    { semana: 'Quinta-Feira', vago: true, cliente: 'Vago' },
    { semana: 'Sexta-Feira', vago: false, cliente: 'Flavio' },
    { semana: 'Sábado', vago: true, cliente: 'Erick' },
    { semana: 'Domingo', vago: false, cliente: 'Vago' },
  ]

  return (
    <div className="bg-slate-200/40 rounded-xl p-2 flex h-[600px] flex-col  items-center overflow-auto">
      <div className="flex md:w-[430px] gap-4">
        <h1 className="text-start font-semibold sm:text-lg md:text-xl border-b border-black/5 shadow-sm ml-2">
          Agendamento do Semana
        </h1>
      </div>
      {semana?.map((horarios, i) => (
        <a
          href=""
          key={i}
          className="   md:w-[430px] h-auto  flex flex-row p-1 items-center rounded-lg gap-4 mt-2 bg-slate-200/50 hover:bg-slate-200"
        >
          <div className="ml-1">
            <FaCalendarAlt size={30} />
          </div>
          <div className="flex-1 flex-col text-center p-1 font-bold text-xs border-x border-slate-500/40">
            <p className="font-bold text-base">{horarios?.semana}</p>
            {horarios?.vago === false ? (
              <p className="text-red-600 text-xl">Indisponivel</p>
            ) : (
              <p className="text-green-600 text-xl">Disponivel</p>
            )}
          </div>
        </a>
      ))}
    </div>
  )
}
