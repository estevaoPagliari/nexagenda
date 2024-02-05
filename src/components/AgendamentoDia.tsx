'use client'
import React, { useState } from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import { FaCalendarDay } from 'react-icons/fa6'
import { ModalCliente } from './ModalCliente'

interface DiaSelecionado {
  dataSelecionada: { dia: number; mes: number } | null
}

export function AgendamentoDia({ dataSelecionada }: DiaSelecionado) {
  const horario = [
    {
      horario: '12:00',
      servico: 'Corte',
      nome: 'Estevão Pagliari',
      telefone: '(19)-992756035',
      rua: 'Joaquim Marques Castelhano',
      numero: '460',
      cidade: 'Porto Ferreira',
      estado: 'São Paulo',
    },
    {
      horario: '12:00',
      servico: 'Corte',
      nome: 'Estevão Pagliari',
      telefone: '(19)-992756035',
      rua: 'Joaquim Marques Castelhano',
      numero: '460',
      cidade: 'Porto Ferreira',
      estado: 'São Paulo',
    },
    {
      horario: '12:00',
      servico: 'Corte',
      nome: 'Estevão Pagliari',
      telefone: '(19)-992756035',
      rua: 'Joaquim Marques Castelhano',
      numero: '460',
      cidade: 'Porto Ferreira',
      estado: 'São Paulo',
    },
    {
      horario: '12:00',
      servico: 'Corte',
      nome: 'Estevão Pagliari',
      telefone: '(19)-992756035',
      rua: 'Joaquim Marques Castelhano',
      numero: '460',
      cidade: 'Porto Ferreira',
      estado: 'São Paulo',
    },
    {
      horario: '12:00',
      servico: 'Corte',
      nome: 'Estevão Pagliari',
      telefone: '(19)-992756035',
      rua: 'Joaquim Marques Castelhano',
      numero: '460',
      cidade: 'Porto Ferreira',
      estado: 'São Paulo',
    },
    {
      horario: '12:00',
      servico: 'Corte',
      nome: 'Estevão Pagliari',
      telefone: '(19)-992756035',
      rua: 'Joaquim Marques Castelhano',
      numero: '460',
      cidade: 'Porto Ferreira',
      estado: 'São Paulo',
    },
    {
      horario: '12:00',
      servico: 'Corte',
      nome: 'Estevão Pagliari',
      telefone: '(19)-992756035',
      rua: 'Joaquim Marques Castelhano',
      numero: '460',
      cidade: 'Porto Ferreira',
      estado: 'São Paulo',
    },
    {
      horario: '12:00',
      servico: 'Corte',
      nome: 'Estevão Pagliari',
      telefone: '(19)-992756035',
      rua: 'Joaquim Marques Castelhano',
      numero: '460',
      cidade: 'Porto Ferreira',
      estado: 'São Paulo',
    },
    {
      horario: '12:00',
      servico: 'Corte',
      nome: 'Estevão Pagliari',
      telefone: '(19)-992756035',
      rua: 'Joaquim Marques Castelhano',
      numero: '460',
      cidade: 'Porto Ferreira',
      estado: 'São Paulo',
    },
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

  return (
    <div className="bg-slate-200/40 rounded-xl flex flex-col items-center h-96 ">
      {/* Agendamento */}
      <div className="flex gap-4 border-black/5 shadow-sm ml-2 w-full justify-center items-center">
        {/* TExto */}
        <div className="text-center font-semibold sm:text-lg md:text-2xl border-b flex">
          Agendamento do Dia
        </div>
        {/* Icon */}
        <div className="flex">
          <FaCalendarDay size="25" />
        </div>
        {/* Seleção de dia */}
      </div>
      {/* Fim Agendamento */}

      <div className="overflow-y-auto w-full ">
        {horario?.map((horarios, i) => (
          <div key={i}>
            <button
              className="flex flex-row w-full p-1 items-center rounded-lg gap-2 mt-2 bg-slate-200/50 hover:bg-[#A1D7E2] transition duration-300"
              onClick={() => handleOpenModal(i)}
            >
              <div className="ml-1">
                <FaCalendarAlt size={30} />
              </div>
              <div className="flex-1 flex-col text-center p-1 font-bold text-xs border-x border-slate-500/40">
                <p className="">{`${dataSelecionada?.dia}/${dataSelecionada?.mes} - ${horarios?.horario}`}</p>
                <p>Serviço - {horarios?.servico}</p>
              </div>
              <div className="flex-1 flex-col text-center p-1 font-bold ">
                <p className="">Cliente :</p>
                <p>{horarios?.nome}</p>
              </div>
            </button>
            <ModalCliente
              visible={isModalVisible[i]}
              onClose={() => handleCloseModal(i)}
              nome={horarios.nome}
              telefone={horarios.telefone}
              cidade={horarios.cidade}
              rua={horarios.rua}
              numero={horarios.numero}
              estado={horarios.estado}
              servico={horarios.servico}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
