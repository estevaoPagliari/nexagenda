'use client'
import { useEffect, useState } from 'react'
import { TipoServicoNew } from '@/api/interface/InterTipoServico'
import { ServicoUser } from '@/api/servico/get-servico-user'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { CriarAgendamento } from '@/api/agendamento/criar-agendamento'

interface ModalInter {
  id: number | null
  isVisible: boolean
  nome: string
  servico: string
  dia: number | null
  mes: number | null
  tempoServico: string
  telefone: number
  horario: string
  email: string
  nomeRecurso: string
  idagenda: number | null
  onClose: () => void
  onAppointmentCancelled: () => void
}

const schema = yup.object().shape({
  cpf: yup.string().required('Campo obrigatório'),
  tipoServico: yup.number().required('Campo obrigatório'),
})

export function ModalAgendar({
  id,
  isVisible,
  onClose,
  nome,
  servico,
  dia,
  mes,
  tempoServico,
  horario,
  telefone,
  email,
  nomeRecurso,
  idagenda,
  onAppointmentCancelled,
}: ModalInter) {
  const [TipoServico, SetTiposervico] = useState<TipoServicoNew[]>([])
  const [carregar, SetCarregado] = useState(false)
  interface FormData {
    cpf: string
    tipoServico: number
  }

  async function FetchTipoServico() {
    try {
      const idString = id !== null ? id.toString() : ''
      const data = await ServicoUser(idString)
      SetTiposervico(data)
      // console.log(TipoServico)
    } catch (error) {
      console.log('error')
    }
  }

  useEffect(() => {
    if (TipoServico.length === 0 && isVisible) {
      FetchTipoServico()
    }
  }, [isVisible]) // Executa apenas quando isVisible muda para true

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  async function handleCreate(data: FormData): Promise<void> {
    const { cpf, tipoServico } = data
    console.log(id)
    console.log(data)
    const IsAuthenticated = await CriarAgendamento(
      dia,
      mes,
      horario,
      id,
      tipoServico,
      5,
    )
  }

  if (!isVisible) {
    return null
  }

  // Verifica se TipoServico está vazio antes de renderizar o conteúdo
  if (TipoServico.length === 0) {
    return <div>Carregando...</div>
  }

  return (
    <div
      className="fixed inset-0 bg-black/5 backdrop-blur-none flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-[800px] flex flex-col ">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => {
            onClose()
          }}
        >
          X
        </button>
        <div className="bg-white text-black p-2 rounded-sm h-80">
          <div className="flex bg-zinc-100/85 gap-4 items-center justify-center font-bold text-2xl">
            <span>
              {dia}/{mes}
            </span>
            <p>{horario}</p>
          </div>
          <div className="flex justify-start">
            <Controller
              control={control}
              name="tipoServico"
              render={({ field: { onChange, onBlur, value } }) => (
                <select
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  defaultValue=""
                >
                  <option disabled value="" className="w-36">
                    Selecione um serviço
                  </option>
                  {TipoServico.map((servico, index) => (
                    <option key={index} value={servico.id} className="w-36">
                      Serviço: {servico.nome} | Horário: {servico.tempoServico}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.tipoServico && <span>{errors.tipoServico?.message}</span>}
            <Controller
              control={control}
              name="cpf"
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  type="cpf"
                  placeholder="Digite seu cpf"
                  className="rounded-sm p-2 font-medium"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.cpf && <span>{errors.cpf?.message}</span>}
            <div>
              <button
                className="bg-red-500 hover:bg-slate-300"
                onClick={handleSubmit(handleCreate)}
              >
                TESTE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
