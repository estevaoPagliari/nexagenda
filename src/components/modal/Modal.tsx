import Link from 'next/link'
import ButtonCancelarAgendamento from '../button/Button-Cancelar-Agendamento'

interface ModalInter {
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
}

export function Modal({
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
}: ModalInter) {
  if (!isVisible) {
    return null
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

          {nome === 'Horário vago' ? (
            <div className="flex-col items-center gap-4">
              <div className="p-4 font-bold text-2xl">
                <span>Horario Vago</span>
              </div>
              <div className="p-4 font-bold text-2xl">
                <span>Deseja Agendar ?</span>
              </div>
              <div className="p-4 font-bold text-2xl text-blue-700">
                <Link href={'/'}>Aperte aqui</Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-flow-col grid-cols-2 p-2">
              <div className="p-2 text-xl border-r ">
                <div className="flex justify-start items-center p-2">
                  Nome Cliente : {nome}
                </div>
                <div className="flex justify-start items-center p-2">
                  Telefone : {telefone}
                </div>
                <div className="flex justify-start items-center p-2">
                  Email : {email}
                </div>
              </div>
              <div className="p-2 text-xl">
                <div className="flex justify-start items-center p-2">
                  Serviço : {servico}
                </div>
                <div className="flex justify-start items-center p-2">
                  Tempo de Serviço : {tempoServico} minutos
                </div>
                <div className="flex justify-start items-center p-2">
                  Recurso : {nomeRecurso}
                </div>
              </div>
            </div>
          )}
          <div className="flex-row gap-10">
            <div className="flex justify-center items-center py-3">
              <ButtonCancelarAgendamento idagenda={idagenda ?? null} />
            </div>
            <div className="flex justify-center items-center py-3">
              <span className="font-semibold w-96 bg-blue-500 rounded-md">
                REAGENDAR
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
