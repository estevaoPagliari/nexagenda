import { MouseEventHandler } from 'react'
import { CgClose } from 'react-icons/cg'

interface ModalClienteProps {
  visible: boolean
  onClose: MouseEventHandler<HTMLButtonElement>
  nome?: string
  telefone?: string
  endereco?: string
  numero?: string
  cidade?: string
  estado?: string
}

export function ModalCliente({
  visible,
  onClose,
  nome,
  telefone,
  endereco,
  numero,
  cidade,
  estado,
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
            <p>(19)-99999999 </p>
          </div>
        </div>
        <div className="flex flex-row gap-2 mt-2">
          <div className="flex bg-slate-100/60 p-2 rounded-sm gap-1">
            <p>Endereço: </p>
            <p>Rua Joaquim Marques Castelhano</p>
          </div>
          <div className="flex bg-slate-100/60 p-2 rounded-sm gap-1">
            <p>N: </p>
            <p>460</p>
          </div>
        </div>
        <div className="flex flex-row gap-2 mt-2">
          <div className="flex bg-slate-100/60 p-2 rounded-sm gap-1">
            <p>Cidade: </p>
            <p>Porto Ferreira</p>
          </div>
          <div className="flex bg-slate-100/60 p-2 rounded-sm gap-1">
            <p>Estado: </p>
            <p>São Paulo</p>
          </div>
        </div>

        <div className="flex flex-row gap-1 p-1 mt-2 justify-center mb-2">
          <div className="flex bg-green-400  p-2 rounded-xl gap-1 font-semibold text-2xl w-96 justify-center">
            <p>Serviço:</p>
            <p>Corte Barba</p>
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
