interface ModalInter {
  isVisible: boolean
  nome: string
  servico: string
  onClose: () => void
}

export function Modal({ isVisible, onClose, nome, servico }: ModalInter) {
  if (!isVisible) {
    return null
  }
  return (
    <div
      className="fixed inset-0 bg-black/5 backdrop-blur-none flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-[900px] flex flex-col ">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => {
            onClose()
          }}
        >
          X
        </button>
        <div className="bg-white p-2 rounded-full">
          Modal
          {nome}
          {servico}
        </div>
      </div>
    </div>
  )
}
