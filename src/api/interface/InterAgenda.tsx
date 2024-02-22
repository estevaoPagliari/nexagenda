import { tipoServico } from './InterTipoServico'
import { userEstabelecimento } from './InterUserEstabelecimento'
import { userCliente } from './interUserCliente'
import { recurso } from './InterRecurso'
export interface agenda {
  id: number // Int
  dia: number // Int
  mes: number // Int
  ano: number // Int
  horario: string // String
  tipoServicoId: number // Int
  estabelecimentoId: number // Int
  clienteId: number // Int
  recursoId: number // Int
  TipoServico: tipoServico[] // Relacionamento com TipoServico
  Estabelecimento: userEstabelecimento[] // Relacionamento com UserEstabelecimento
  Cliente: userCliente[] // Relacionamento com UserCliente
  Recurso: recurso[] // Relacionamento com Recurso
}
