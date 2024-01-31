'use client'
import React, { useState } from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import { FaCalendarDay } from 'react-icons/fa6'

export function AgendamentoDia() {
  const [selectedDay, setSelectedDay] = useState<string>('20')
  const [selectedMonth, setSelectedMonth] = useState<string>('03')

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

  const dias = Array.from({ length: 31 }, (_, i) => (i + 1).toString())
  const meses = Array.from({ length: 12 }, (_, i) =>
    new Date(2000, i, 1).toLocaleString('pt-BR', { month: 'long' }),
  )

  return (
    <div className="bg-slate-200/40 rounded-xl h-96  flex flex-col  items-center ">
      <div className="flex flex-1 w-96 ">
        <h1 className="text-start font-semibold sm:text-lg md:text-base border-b border-black/5 shadow-sm ml-2">
          Agendamento do Dia
        </h1>
        <div className="flex flex-1 justify-end items-center ">
          <FaCalendarDay size="25" />
          <div className="flex gap-2 ml-2">
            <select
              className="border-b border-black/5 shadow-sm"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              {dias.map((dia) => (
                <option key={dia} value={dia}>
                  {dia}
                </option>
              ))}
            </select>
            <span>/</span>
            <select
              className="border-b border-black/5 shadow-sm"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {meses.map((mes, index) => (
                <option
                  key={index}
                  value={(index + 1).toString().padStart(2, '0')}
                >
                  {mes}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto">
        {horario?.map((horarios, i) => (
          <div
            key={i}
            className="w-80 flex flex-row p-1 items-center rounded-lg gap-2 mt-2 bg-slate-200/50 hover:bg-[#A1D7E2] transition duration-300"
          >
            <div className="ml-1">
              <FaCalendarAlt size={30} />
            </div>
            <div className="flex-1 flex-col text-center p-1 font-bold text-xs border-x border-slate-500/40">
              <p className="">{`${selectedDay}/${selectedMonth} - ${horarios?.horario}`}</p>
              <p>Serviço - {horarios?.servico}</p>
            </div>
            <div className="flex-1 flex-col text-center p-1 font-bold ">
              <p className="">Cliente :</p>
              <p>{horarios?.cliente}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
