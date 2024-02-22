import { userEstabelecimento } from './InterUserEstabelecimento'
import { agenda } from './InterAgenda'

export interface recurso {
  id: number // Int
  nome: string // String
  estabelecimentoId: number // Int
  Estabelecimento: userEstabelecimento[] // Relacionamento com UserEstabelecimento
  Agenda: agenda[] // Array de Agenda
}
