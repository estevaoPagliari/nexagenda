import { api } from '@/api/api'

export async function ServicoUser(idagenda: string) {
  console.log(idagenda)
  try {
    const response = api.get(`/tiposervicouser/${idagenda}`)
    return (await response).data
  } catch (error) {
    console.error('Erro na solicitação delete:', error)
  }
}
