import { tipoServico } from './InterTipoServico'
import { agenda } from './InterAgenda'
import { endereco } from './InterEndereco'
import { recurso } from './InterRecurso'
import { HorarioFuncionamento } from './interHorarioFuncionamento'
export interface userEstabelecimento {
  id: number // Int
  nome: string // String
  email: string // String
  senha: string // String
  cpf: number // Int
  telefone: number // Int
  createdAt: Date // DateTime
  updatedAt: Date // DateTime
  Endereco: endereco[] // Array de Endereco
  TipoServico: tipoServico[] // Array de TipoServico
  Recursos: recurso[] // Array de Recurso
  Agenda: agenda[] // Array de Agenda
  HorarioFuncionamento: HorarioFuncionamento[] // Array de HorarioFuncionamento
}
