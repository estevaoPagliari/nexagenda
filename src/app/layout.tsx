import './globals.css'
import { MenuSideBar } from '@/components/MenuSideBar'
import Image from 'next/image'

export const metadata = {
  title: 'Nex Agenda',
  description: 'Sistema de Agendamento',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-100 text-black ">
        <main className="h-screen flex flex-1">
          <div className="flex flex-col md:flex-row">
            <MenuSideBar />

            <div className="flex flex-col p-4">
              <Image
                className="w-28 h-auto md:w-40 md:h-max mb-4 md:mr-4"
                src={require('../assets/logo.png')}
                alt="logo"
              />

              <div className="flex flex-col justify-start items-start">
                <h1 className="text-2xl md:text-3xl lg:text-4xl mb-2">
                  Painel de Controle
                </h1>
                <h3 className="text-sm md:text-base lg:text-lg">
                  Bem Vindo Salão Dev Nex!
                </h3>
              </div>
            </div>
          </div>
        </main>
        {children}
      </body>
    </html>
  )
}
