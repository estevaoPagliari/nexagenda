'use cliente'
import { MenuSideBar } from '@/components/MenuSideBar'
import { Welcome } from '@/components/Welcome'
import { getUser } from '@/lib/auth'
import { Dashboard } from '@/components/Dashboard'
import { ButtonLogout } from '@/components/button/Button-Logout'

import { Modal } from '@/components/modal/Modal'

export default function Agenda() {
  const { sub, name } = getUser()
  const id: number = parseInt(sub)

  return (
    <div>
      <MenuSideBar />

      <div className=" flex-col ml-16 sm:flex-row md:flex-row">
        <div className="flex items-center justify-between px-4">
          <Welcome nome={name || ''} />

          <ButtonLogout />
        </div>

        <Dashboard id={id} />
      </div>
    </div>
  )
}
