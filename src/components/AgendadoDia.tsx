import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { api } from '../api/api'
import { FaRegCalendarCheck, FaRegCalendarXmark } from 'react-icons/fa6'

interface AppointmentData {
  dia: string
  time: string
  clientName: string
  service: string
  timeservice?: string
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
        if (dataSelecionada) {
          const { dia, mes } = dataSelecionada
          const response = await api.get(`/api/appointments/${dia}/${mes}`, {
            headers: {},
          })
          setAppointments(response.data)
          console.log(response.data)
        }
      } catch (error) {
        console.error('Error fetching appointments:', error)
      }
    }

    fetchAppointments()
  }, [dataSelecionada])

  const generateEmptyAppointments = (
    openingTime: string,
    closingTime: string,
    lunchStart: string,
    lunchEnd: string,
    appointments: AppointmentData[],
  ) => {
    const emptyAppointments: AppointmentData[] = []
    let currentTime = openingTime

    while (currentTime < closingTime) {
      const isDuringLunchBreak =
        currentTime >= lunchStart && currentTime < lunchEnd
      const isDuringService = appointments.some((appointment) => {
        const endTime = incrementTime(
          appointment.time,
          parseInt(appointment.timeservice || '0'),
        )
        return currentTime >= appointment.time && currentTime < endTime
      })

      if (!isDuringLunchBreak && !isDuringService) {
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

  const incrementTime = (time: string, minutes: number): string => {
    const [hour, minute] = time.split(':').map(Number)
    const newMinute = (minute + minutes) % 60
    const newHour = hour + Math.floor((minute + minutes) / 60)
    return `${String(newHour).padStart(2, '0')}:${String(newMinute).padStart(
      2,
      '0',
    )}`
  }

  const emptyAppointments = generateEmptyAppointments(
    openingTime,
    closingTime,
    lunchStart,
    lunchEnd,
    appointments,
  )

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
            className={`flex items-center gap-2 p-2 bg-slate-200/50 rounded-xl cursor-pointer hover:bg-blue-100 transition duration-300 ${
              appointment.clientName === 'Horário vago'
                ? 'text-red-500 font-normal bg-red-100'
                : 'text-green-500 font-semibold bg-green-100'
            }`}
          >
            <div className="ml-1">
              {appointment.clientName === 'Horário vago' ? (
                <FaRegCalendarXmark size={30} />
              ) : (
                <FaRegCalendarCheck size={30} />
              )}
            </div>
            <div className="mr-4">{appointment.time}</div>
            <div className="flex-1">
              <div>{`Cliente: ${appointment.clientName}`}</div>
              <div>{`Serviço: ${appointment.service}`}</div>
              {appointment.timeservice && (
                <div>{`Tempo de serviço: ${appointment.timeservice}`}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
