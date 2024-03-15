import { useState } from 'react'
import { CancelarAgendamento } from '@/api/agendamento/cancelar-agendamento'
import { FadeLoader, BarLoader } from 'react-spinners'

export default function ButtonCancelarAgendamento({
  idagenda,
  onCancel,
  onAppointmentCancelled,
}: {
  idagenda: number | null
  onCancel: () => void
  onAppointmentCancelled: () => void
}) {
  const [isCancelling, setIsCancelling] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [cancelSuccess, setCancelSuccess] = useState(false)

  async function handleCancelarAgendamento() {
    try {
      setIsCancelling(true)
      const idString = idagenda !== null ? idagenda.toString() : ''
      const cancel = await CancelarAgendamento(idString)
      if (cancel === 200) {
        setCancelSuccess(true)
        onAppointmentCancelled() // Chamando a função para atualizar a lista de agendamentos
        onCancel() // Chamando a função para fechar o modal
      }
      setIsCancelling(false)
      return cancel
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error)
      setIsCancelling(false)
    }
  }

  return (
    <div>
      {showConfirmation ? (
        <div className=" flex-row">
          <div>
            <span>Deseja mesmo cancelar este agendamento?</span>
          </div>
          <div className="flex  items-center justify-between">
            <button
              className="w-32 bg-red-300 rounded-md  hover:bg-red-600 hover:scale-105 duration-300"
              onClick={handleCancelarAgendamento}
            >
              Sim
            </button>

            <button
              className="w-32 bg-blue-300 rounded-md hover:bg-blue-600 hover:scale-105 duration-300"
              onClick={() => setShowConfirmation(false)}
            >
              Não
            </button>
          </div>
        </div>
      ) : (
        <button
          className="font-semibold w-80 bg-red-500 rounded-md hover:scale-110 hover:bg-red-600 duration-500"
          onClick={() => setShowConfirmation(true)}
        >
          <span>CANCELAR</span>
        </button>
      )}
      {isCancelling && (
        <div className="flex justify-center items-center p-2">
          <BarLoader color="#A1D7E2" loading={true} />
        </div>
      )}
      {cancelSuccess && (
        <div className="flex flex-1 h-56">
          <button onClick={() => setCancelSuccess(false)}>Fechar</button>
        </div>
      )}
    </div>
  )
}
