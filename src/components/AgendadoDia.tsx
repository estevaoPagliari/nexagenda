import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Appointments, { LoadAppointments } from '@/api/appointments'
import { api } from '@/api/api'

interface AppointmentData {
  time: string
  clientName: string
  service: string
}

export function AgendadoDia() {
  const openingTime = '09:00'
  const closingTime = '21:00'
  const lunchStart = '12:00'
  const lunchEnd = '13:30'

  const [appointments, setAppointments] = useState<AppointmentData[]>([])

  async function LoadAppointmentsData() {
    const response = await api.get<Appointments>(`/api/appointments`)
    console.log(response.data)
  }

  useEffect(() => {
    LoadAppointmentsData()
  }, [])

  return (
    <div className="bg-slate-200/40 rounded-xl py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto h-96">
      <h1 className="text-3xl font-bold mb-8">Agenda do Estabelecimento</h1>
      <div className="grid grid-cols-1 gap-4 ">
        {appointments.map((appointment, index) => (
          <div key={index} className="flex items-center">
            <div className="mr-4">{appointment.time}</div>
            <div className="flex-1">
              <>
                <div>{`Cliente: ${appointment.clientName}`}</div>
                <div>{`Serviço: ${appointment.service}`}</div>
              </>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
