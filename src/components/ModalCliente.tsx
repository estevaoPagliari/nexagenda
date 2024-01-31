interface ModalClienteProps {
  visible: boolean
  onClose: boolean
}

export function ModalCliente({ visible, onClose }: ModalClienteProps) {
  if (!visible) return null
  return (
    <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-2 rounded-sm">
        <p>Modal</p>
      </div>
    </div>
  )
}
