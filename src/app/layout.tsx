import './globals.css'

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
      <body className="bg-zinc-50 text-black ">
        <main className="grid ">{children}</main>
      </body>
    </html>
  )
}
