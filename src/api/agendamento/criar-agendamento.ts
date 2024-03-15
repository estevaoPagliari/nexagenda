import { api } from '../api'
export async function CriarAgendamento(
  dia: number | null, // Validar se é um email válido
  mes: number | null,
  horario: string,
  estabelecimentoId: number | null,
  tipoServicoId: number | null,
  clienteId: number | null,
) {
  try {
    console.log('teste')
    const ano = 2024
    const recursoId = 2
    const response = await api.post('/agendaservico', {
      dia,
      mes,
      ano,
      horario,
      estabelecimentoId,
      tipoServicoId,
      clienteId,
      recursoId,
    })
    console.log(response.data)

    return response.data
  } catch (error) {
    console.error('Status do erro:', error)
    return false
  }
}
