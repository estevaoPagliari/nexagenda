import { api } from './api'

export async function Loaduser(userId: string) {
  try {
    const response = api.get(`/userestabelecimento/${userId}`)
    // console.log((await response).data[userId])
    return (await response).data
  } catch (error) {
    console.error('Erro na solicitação GET:', error)
  }
}
