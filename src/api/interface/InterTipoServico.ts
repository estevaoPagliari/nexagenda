import { userEstabelecimento } from './InterUserEstabelecimento'
import { agenda } from './InterAgenda'

export interface tipoServico {
  id: number // Int
  nome: string // String
  tempoServico: number // Int
  UserEstabelecimentoId: number // Int
  UserEstabelecimento: userEstabelecimento[] // Relacionamento com UserEstabelecimento
  Agenda: agenda[] // Array de Agenda
}
