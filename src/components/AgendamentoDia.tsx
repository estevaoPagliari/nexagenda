'use client'
import React, { useState } from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import { FaCalendarDay } from 'react-icons/fa6'
import { ModalCliente } from './ModalCliente'

export function AgendamentoDia() {
  const horario = [
    { horario: '13:00', servico: 'Vago', nome: 'Vago' },
    { horario: ' 14:00', servico: 'Vago', nome: 'Vago' },
    {
      horario: '15:00',
      servico: 'Corte',
      nome: 'Estevão Pagliari',
      telefone: '(19)-992756035',
      rua: 'Joaquim Marques Castelhano',
      numero: '460',
      cidade: 'Porto Ferreira',
      estado: 'São Paulo',
    },
    { horario: '16:00', servico: 'Corte e Barba', nome: 'Dudu' },
    { horario: '17:00', servico: 'Corte', nome: 'Yuri' },
    { horario: '18:00', servico: 'Vago', nome: 'Vago' },
    { horario: '19:00', servico: 'Barba', nome: 'Flavio' },
    { horario: '20:00', servico: 'Barba', nome: 'Erick' },
    { horario: '21:00', servico: 'Vago', nome: 'Vago' },
  ]
  const [isModalVisible, setModalVisible] = useState<Array<boolean>>(
    horario.map(() => false),
  )

  const handleOpenModal = (index: number) => {
    setModalVisible((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  const handleCloseModal = (index: number) => {
    setModalVisible((prev) => {
      const newState = [...prev]
      newState[index] = false
      return newState
    })
  }
  const [selectedDay, setSelectedDay] = useState<string>('20')
  const [selectedMonth, setSelectedMonth] = useState<string>('03')

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
              className="border-b border-black/5 shadow-sm rounded-md"
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
              className="border-b border-black/5 shadow-sm rounded-md"
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
          <div key={i}>
            <button
              className="w-96 flex flex-row p-1 items-center rounded-lg gap-2 mt-2 bg-slate-200/50 hover:bg-[#A1D7E2] transition duration-300"
              onClick={() => handleOpenModal(i)}
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
                <p>{horarios?.nome}</p>
              </div>
              <ModalCliente
                visible={isModalVisible[i]}
                onClose={() => handleCloseModal(i)}
                nome={horarios.nome}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
