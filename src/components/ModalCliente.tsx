import { MouseEventHandler } from 'react'
import { CgClose } from 'react-icons/cg'

interface ModalClienteProps {
  visible: boolean
  onClose: () => void
  nome?: string
  telefone?: string
  rua?: string
  numero?: string
  cidade?: string
  estado?: string
  servico?: string
}

export function ModalCliente({
  visible,
  onClose,
  nome,
  telefone,
  rua,
  numero,
  cidade,
  estado,
  servico,
}: ModalClienteProps) {
  if (!visible) return null
  return (
    <div className="fixed inset-0 bg-black/5 backdrop-blur-none flex items-center justify-center">
      <div className="flex-row bg-white p-4 rounded-md  justify-center items-center">
        <div className="flex items-center justify-between mb-5 ">
          <div className="flex bg-slate-100/80 p-2 rounded-md gap-4 font-semibold text-2xl">
            <div className="flex">
              <p>Dia: </p>
              <p>20/03</p>
            </div>
            <div className="flex">
              <p>Horario: </p>
              <p>20:00</p>
            </div>
          </div>

          <CgClose
            onClick={onClose}
            size={30}
            className="cursor-pointer scale-100 hover:scale-105"
          />
        </div>
        <div className="flex flex-row gap-2 mt-2">
          <div className="flex bg-slate-100/60 p-2 rounded-sm gap-1">
            <p>Nome: </p>
            <p>{nome}</p>
          </div>
          <div className="flex bg-slate-100/60 p-2 rounded-sm gap-1">
            <p>Telefone: </p>
            <p>{telefone !== null && telefone !== '' ? telefone : 'Vago'} </p>
          </div>
        </div>
        <div className="flex flex-row gap-2 mt-2">
          <div className="flex bg-slate-100/60 p-2 rounded-sm gap-1">
            <p>Endereço: </p>
            <p>{rua}</p>
          </div>
          <div className="flex bg-slate-100/60 p-2 rounded-sm gap-1">
            <p>N: </p>
            <p>{numero}</p>
          </div>
        </div>
        <div className="flex flex-row gap-2 mt-2">
          <div className="flex bg-slate-100/60 p-2 rounded-sm gap-1">
            <p>Cidade: </p>
            <p>{cidade}</p>
          </div>
          <div className="flex bg-slate-100/60 p-2 rounded-sm gap-1">
            <p>Estado: </p>
            <p>{estado}</p>
          </div>
        </div>

        <div className="flex flex-row gap-1 p-1 mt-2 justify-center mb-2">
          <div className="flex bg-green-400  p-2 rounded-xl gap-1 font-semibold text-2xl w-96 justify-center">
            <p>Serviço:</p>
            <p>{servico}</p>
          </div>
        </div>
        <div className="flex items-center justify-center mb-2 border-b-2 bg-red-500 rounded-xl ">
          <button className=" w-80 scale-100 font-semibold text-xl transform hover:scale-110 duration-200">
            Cancelar Reserva{' '}
          </button>
        </div>
        <div className="flex items-center justify-center  border-b-2 bg-blue-500 rounded-xl">
          <button className=" w-80 scale-100 font-semibold text-xl transform hover:scale-110 duration-200">
            Reagendar{' '}
          </button>
        </div>
      </div>
    </div>
  )
}
