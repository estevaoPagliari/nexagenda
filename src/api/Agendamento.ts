import { api } from './api'

export async function LoadAgendaDia(id: string, dia: string, mes: string) {
  try {
    console.log(id)
    console.log(dia)
    console.log(mes)
    const response = api.get(
      `/agendaservicodiaestabelecimento/${id}/${dia}/${mes}`,
    )
    return (await response).data
  } catch (error) {
    console.error('Erro na solicitação GET:', error)
  }
}
