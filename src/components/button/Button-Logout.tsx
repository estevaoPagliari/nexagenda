'use client'
import { CiLogout } from 'react-icons/ci'
import { Logout } from '@/api/logout/logout'
export function ButtonLogout() {
  return (
    <button
      className="hover:bg-slate-200/50 border-2 rounded-md duration-500"
      onClick={Logout}
    >
      <CiLogout size={40} />
    </button>
  )
}
