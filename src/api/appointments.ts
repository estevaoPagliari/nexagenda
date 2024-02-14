import { api } from './api'

interface Appointments {
  time: string
  clientName: string
  service: string
}

export async function LoadAppointments() {
  try {
    const response = await api.get<Appointments>(`/api/appointments`)
    return response.data
  } catch (error) {
    console.error('Erro na solicitação GET:', error)
  }
}

export default Appointments
