'use client'
import React, { useState, useEffect } from 'react'
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
} from 'date-fns'

const Calendario: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [diaSelecionado, setDiaSelecionado] = useState<Date | null>(null)
  const [horaAtual, setHoraAtual] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHoraAtual(new Date())
    }, 1000) // Atualiza a cada segundo

    return () => clearInterval(intervalId)
  }, []) // Executa o useEffect uma vez

  const diasDoMes = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  })

  const avancarMes = () => {
    setCurrentDate(addMonths(currentDate, 1))
    setDiaSelecionado(null) // Limpa a seleção ao mudar de mês
  }

  const retrocederMes = () => {
    setCurrentDate(subMonths(currentDate, 1))
    setDiaSelecionado(null) // Limpa a seleção ao mudar de mês
  }

  const selecionarDia = (dia: Date) => {
    setDiaSelecionado((prevDiaSelecionado) => {
      // Se o dia selecionado for igual ao dia atual, mantenha-o; caso contrário, atualize para o dia selecionado
      return prevDiaSelecionado &&
        format(prevDiaSelecionado, 'yyyy-MM-dd') ===
          format(new Date(), 'yyyy-MM-dd')
        ? prevDiaSelecionado
        : dia
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={retrocederMes}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          &lt; Anterior
        </button>
        <h2 className="text-2xl font-bold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={avancarMes}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Próximo &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {diasDoMes.map((dia, index) => (
          <div
            key={index}
            className={`text-center p-2 border ${
              diaSelecionado === dia ? 'bg-blue-200' : ''
            }`}
            onClick={() => selecionarDia(dia)}
          >
            {format(dia, 'd')}
          </div>
        ))}
      </div>
      <div className="mt-4">
        {diaSelecionado && (
          <p>Dia selecionado: {format(diaSelecionado, 'dd/MM/yyyy')}</p>
        )}
        <p>Horário atual: {format(horaAtual, 'HH:mm:ss')}</p>

        {/* Adicione a exibição da data atual */}
        <p>Data atual: {format(new Date(), 'dd/MM/yyyy')}</p>
        {/* Adicione a exibição da hora atual em um formato específico */}
        <p>Hora atual: {format(horaAtual, 'hh:mm a')}</p>
      </div>
    </div>
  )
}

export default Calendario
