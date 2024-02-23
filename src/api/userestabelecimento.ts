import { api } from './api'

const userId = '4'
export async function Loaduser() {
  try {
    const response = api.get(`/userestabelecimento/${userId}`)
    console.log((await response).data[userId])
    return (await response).data
  } catch (error) {
    console.error('Erro na solicitação GET:', error)
  }
}
