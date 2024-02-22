import { endereco } from './InterEndereco'
import { agenda } from './InterAgenda'
export interface userCliente {
  id: number // Int
  nome: string // String
  email: string // String
  senha: string // String
  cpf: number // Int
  telefone: number // Int
  createdAt: Date // DateTime
  updatedAt: Date // DateTime
  Endereco: endereco[] // Array de Endereco
  Agenda: agenda[] // Array de Agenda
}
