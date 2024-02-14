import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { api } from '../api/api'

interface AppointmentData {
  dia: string
  time: string
  clientName: string
  service: string
}
interface DiaSelecionado {
  dataSelecionada: { dia: number; mes: number } | null
}

export function AgendadoDia({ dataSelecionada }: DiaSelecionado) {
  const openingTime = '09:00'
  const closingTime = '21:00'
  const lunchStart = '12:00'
  const lunchEnd = '13:30'

  const [appointments, setAppointments] = useState<AppointmentData[]>([])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const dia = dataSelecionada?.dia
        const mes = dataSelecionada?.mes
        const response = await api.get(`/api/appointments/${dia}/${mes}`, {
          headers: {},
        })
        setAppointments(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      }
    }

    fetchAppointments()
  }, [])

  // Função para gerar horários vagos
  const generateEmptyAppointments = (
    openingTime: string,
    closingTime: string,
    lunchStart: string,
    lunchEnd: string,
    appointments: AppointmentData[],
  ) => {
    const emptyAppointments: AppointmentData[] = []
    let currentTime = openingTime

    // Adiciona horários vagos até o horário de fechamento, pulando o horário de almoço e os horários já agendados
    while (currentTime < closingTime) {
      if (
        currentTime < lunchStart ||
        (currentTime >= lunchEnd && currentTime < closingTime)
      ) {
        // Verifica se o horário já foi agendado
        if (
          appointments.find((appointment) => appointment.time === currentTime)
        ) {
          currentTime = incrementTime(currentTime, 30)
          continue
        }

        emptyAppointments.push({
          dia: '',
          time: currentTime,
          clientName: 'Horário vago',
          service: 'Nenhum serviço agendado',
        })
      }

      currentTime = incrementTime(currentTime, 30)
    }

    return emptyAppointments
  }

  // Função para incrementar o horário em minutos
  const incrementTime = (time: string, minutes: number): string => {
    const [hour, minute] = time.split(':').map(Number)
    const newMinute = (minute + minutes) % 60
    const newHour = hour + Math.floor((minute + minutes) / 60)
    return `${String(newHour).padStart(2, '0')}:${String(newMinute).padStart(
      2,
      '0',
    )}`
  }

  // Gera horários vagos
  const emptyAppointments = generateEmptyAppointments(
    openingTime,
    closingTime,
    lunchStart,
    lunchEnd,
    appointments,
  )

  // Adiciona horários vagos à lista de agendamentos
  const allAppointments = [...appointments, ...emptyAppointments].sort(
    (a, b) => (a.time > b.time ? 1 : -1),
  )

  return (
    <div className="bg-slate-200/40 rounded-xl py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto h-96">
      <h1 className="text-3xl font-bold mb-8">Agenda do Estabelecimento</h1>
      <div>
        <p>{dataSelecionada?.dia}/</p>
        <p>{dataSelecionada?.mes}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {allAppointments.map((appointment, index) => (
          <div
            key={index}
            className="flex items-center p-2 bg-slate-200/50 rounded-xl hover:bg-[#A1D7E2] transition duration-300"
          >
            <div
              className={`mr-4 ${
                appointment.clientName === 'Horário vago'
                  ? 'text-red-500 font-normal'
                  : 'text-green-500 font-semibold'
              }`}
            >
              {appointment.time}
            </div>
            <div
              className={`flex-1 ${
                appointment.clientName === 'Horário vago'
                  ? 'text-red-500 font-normal'
                  : 'text-green-500 font-semibold'
              }`}
            >
              <div>{`Cliente: ${appointment.clientName}`}</div>
              <div>{`Serviço: ${appointment.service}`}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
