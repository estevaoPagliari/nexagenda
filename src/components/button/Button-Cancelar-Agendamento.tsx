'use client'
import { useRouter } from 'next/navigation'
import { CancelarAgendamento } from '@/api/agendamento/cancelar-agendamento'
import { useState } from 'react'
export default function ButtonCancelarAgendamento({
  idagenda,
}: {
  idagenda: number | null
}) {
  const router = useRouter()

  const [UserCancel, setUserCancel] = useState(false)

  async function UserCancelarAgendamento() {
    router.replace('/agenda')
    // try {
    //   let idString = ''
    //   if (idagenda !== null) {
    //     idString = idagenda.toString()
    //   }
    //   const cancel = await CancelarAgendamento(idString)
    //   if (cancel === 200) {
    //     console.log('recarregar')
    //     setUserCancel(true)
    //     router.push('/agenda')
    //   }
    //   return cancel
    // } catch (error) {
    //   console.error('Erro ao carregar dados do usuário:', error)
    // }
  }
  return (
    <div>
      <button
        className="font-semibold w-96 bg-red-500 rounded-md hover:scale-110 hover:bg-red-600 duration-500"
        onClick={() => UserCancelarAgendamento()}
      >
        <span>CANCELAR</span>
      </button>
      {UserCancel ? (
        <div>
          <span>cancelado com sucesso</span>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}
