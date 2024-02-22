import { api } from './api'

export async function Loaduser() {
  try {
    const response = api.get(`/userestabelecimento`)
    return (await response).data
  } catch (error) {
    console.error('Erro na solicitação GET:', error)
  }
}
