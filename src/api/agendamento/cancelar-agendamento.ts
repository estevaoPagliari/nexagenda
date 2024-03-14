import { api } from '@/api/api'

export async function CancelarAgendamento(idagenda: string) {
  console.log(idagenda)
  try {
    const response = api.delete(`/agendaservico/${idagenda}`)
    return (await response).status
  } catch (error) {
    console.error('Erro na solicitação delete:', error)
  }
}
