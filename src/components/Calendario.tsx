'use client'
import React, { useState } from 'react'
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
  getDay,
} from 'date-fns'
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from 'react-icons/fa'

export function Calendario() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const diasDoMes = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  })

  // Adiciona espaços em branco no início para alinhar com o dia da semana correto
  const diasVazios = new Array(getDay(diasDoMes[0])).fill(null)

  const avancarMes = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const retrocederMes = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  return (
    <div className="bg-slate-200/40 rounded-xl p-1 justify-center items-center h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <FaRegArrowAltCircleLeft size={30} onClick={retrocederMes} />
        <h2 className="text-2xl font-bold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <FaRegArrowAltCircleRight size={30} onClick={avancarMes} />
      </div>
      <div className="grid grid-cols-7 gap-4">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((diaSemana) => (
          <div key={diaSemana} className="text-center justify-center p-2">
            {diaSemana}
          </div>
        ))}
        {diasVazios.map((_, index) => (
          <div key={`empty-${index}`} className="text-center p-2 border"></div>
        ))}
        {diasDoMes.map((dia, index) => (
          <div
            key={index}
            className="text-center p-2 border rounded-md hover:bg-[#A1D7E2] transition duration-300"
          >
            {format(dia, 'd')}
          </div>
        ))}
      </div>
    </div>
  )
}
