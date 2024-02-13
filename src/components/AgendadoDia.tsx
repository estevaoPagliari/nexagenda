import React, { useState, useEffect } from 'react'
import { format, isToday } from 'date-fns'

interface Appointment {
  time: string
  clientName: string
  service: string
}

const generateAppointments = (
  openingTime: string,
  closingTime: string,
  lunchStart: string,
  lunchEnd: string,
): Appointment[] => {
  const appointments: Appointment[] = []
  const currentTime = new Date()
  const openingHour = parseInt(openingTime.split(':')[0])
  const closingHour = parseInt(closingTime.split(':')[0])
  const lunchStartHour = parseInt(lunchStart.split(':')[0])
  const lunchEndHour = parseInt(lunchEnd.split(':')[0])

  // Gerar horários de trabalho
  for (let i = openingHour; i < closingHour; i++) {
    const hour = i < 10 ? `0${i}` : `${i}`
    if (i < lunchStartHour || i >= lunchEndHour) {
      appointments.push({ time: `${hour}:00`, clientName: '', service: '' })
      appointments.push({ time: `${hour}:30`, clientName: '', service: '' })
    }
  }

  return appointments
}

export function AgendadoDia() {
  const openingTime = '09:00'
  const closingTime = '21:00'
  const lunchStart = '12:00'
  const lunchEnd = '13:30'

  const [appointments, setAppointments] = useState<Appointment[]>(
    generateAppointments(openingTime, closingTime, lunchStart, lunchEnd),
  )

  const handleAppointmentChange = (
    index: number,
    clientName: string,
    service: string,
  ) => {
    const updatedAppointments = [...appointments]
    updatedAppointments[index].clientName = clientName
    updatedAppointments[index].service = service
    setAppointments(updatedAppointments)
  }
  return (
    <div className="bg-slate-200/40 rounded-xl py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto h-96">
      <h1 className="text-3xl font-bold mb-8">Agenda do Estabelecimento</h1>
      <div className="grid grid-cols-1 gap-4 ">
        {appointments.map((appointment, index) => (
          <div key={index} className="flex items-center">
            <div className="mr-4">{appointment.time}</div>
            <div className="flex-1">
              <input
                type="text"
                value={appointment.clientName}
                onChange={(e) =>
                  handleAppointmentChange(
                    index,
                    e.target.value,
                    appointment.service,
                  )
                }
                className="border rounded-md px-2 py-1 w-full mb-2"
                placeholder="Nome do cliente"
              />
              <input
                type="text"
                value={appointment.service}
                onChange={(e) =>
                  handleAppointmentChange(
                    index,
                    appointment.clientName,
                    e.target.value,
                  )
                }
                className="border rounded-md px-2 py-1 w-full"
                placeholder="Serviço"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
