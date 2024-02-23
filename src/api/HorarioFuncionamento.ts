import { api } from './api'

export async function LoadHorario(userId: string) {
  try {
    const response = api.get(`/horariofuncionamento/${userId}`)
    return (await response).data
  } catch (error) {
    console.error('Erro na solicitação GET:', error)
  }
}
