import Image from 'next/image'
export function Welcome() {
  return (
    <div className="flex flex-row max-w-96 m h-24 p-2  items-center ">
      <div className="bg-gray-200 p-3 rounded-full shadow-xl">
        <Image src={require('../assets/logo.png')} alt="logo" width={100} />
      </div>
      <div className="text-center justify-stretch ">
        <h1 className="text-2xl font-bold m-4">Bem Vindo</h1>
        <h1 className="text-2xl font-bold m-4">Salão Dev Nex !</h1>
      </div>
    </div>
  )
}
