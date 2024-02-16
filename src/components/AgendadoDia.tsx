import React, { useState, useEffect } from 'react'
import { api } from '../api/api'
import { FaRegCalendarCheck, FaRegCalendarXmark } from 'react-icons/fa6'

// Definição da interface para os dados de cada agendamento
interface AppointmentData {
  dia: string
  time: string
  clientName: string
  service: string
  timeservice?: string
}

// Definição da interface para os dados da data selecionada
interface DiaSelecionado {
  dataSelecionada: { dia: number; mes: number } | null
}

// Componente funcional AgendadoDia
export function AgendadoDia({ dataSelecionada }: DiaSelecionado) {
  // Definição dos horários de abertura, fechamento e almoço
  const openingTime = '09:00'
  const closingTime = '21:00'
  const lunchStart = '12:00'
  const lunchEnd = '13:30'

  // Estado para armazenar os agendamentos
  const [appointments, setAppointments] = useState<AppointmentData[]>([])

  // Efeito para buscar os agendamentos quando a data selecionada mudar
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (dataSelecionada) {
          const { dia, mes } = dataSelecionada
          const response = await api.get(`/api/appointments/${dia}/${mes}`, {
            headers: {},
          })
          setAppointments(response.data)
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

    // Criar uma lista de todos os horários ocupados
    const occupiedTimes: { startTime: string; endTime: string }[] = []
    appointments.forEach((appointment) => {
      const endTime = incrementTime(
        appointment.time,
        parseInt(appointment.timeservice || '0'),
      )
      occupiedTimes.push({ startTime: appointment.time, endTime })
    })

    // Gerar uma lista de todos os horários possíveis no intervalo de horário de trabalho
    while (currentTime < closingTime) {
      const isDuringLunchBreak =
        currentTime >= lunchStart && currentTime < lunchEnd

      // Verificar se o horário está dentro de um intervalo ocupado
      const isDuringService = occupiedTimes.some(
        (occupiedTime) =>
          currentTime >= occupiedTime.startTime &&
          currentTime < occupiedTime.endTime,
      )

      // Se o horário não estiver ocupado e não estiver durante o intervalo de almoço, adicionar à lista de horários vazios
      if (!isDuringLunchBreak && !isDuringService) {
        emptyAppointments.push({
          dia: '',
          time: currentTime,
          clientName: 'Horário vago',
          service: 'Nenhum serviço agendado',
        })
      }

      currentTime = incrementTime(currentTime, 15)
    }

    return emptyAppointments
  }

  // Função para incrementar o tempo
  const incrementTime = (time: string, minutes: number): string => {
    const [hour, minute] = time.split(':').map(Number)
    const newMinute = (minute + minutes) % 60
    const newHour = hour + Math.floor((minute + minutes) / 60)
    return `${String(newHour).padStart(2, '0')}:${String(newMinute).padStart(
      2,
      '0',
    )}`
  }

  // Gerar os horários vazios
  const emptyAppointments = generateEmptyAppointments(
    openingTime,
    closingTime,
    lunchStart,
    lunchEnd,
    appointments,
  )

  // Concatenar os agendamentos com os horários vazios e ordená-los
  const allAppointments = [...appointments, ...emptyAppointments].sort(
    (a, b) => (a.time > b.time ? 1 : -1),
  )

  // Retornar o JSX do componente
  return (
    <div className="bg-slate-200/40 rounded-xl py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto h-96">
      <h1 className="text-3x1 font-bold mb-8">Agenda do Estabelecimento</h1>
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
