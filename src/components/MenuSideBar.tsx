'use client'
import React, { useState } from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { MdOutlineDashboard } from 'react-icons/md'
import { RiSettings4Line } from 'react-icons/ri'
import { TbReportAnalytics } from 'react-icons/tb'
import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai'
import { FiMessageSquare, FiFolder, FiShoppingCart } from 'react-icons/fi'

export function MenuSideBar() {
  const menus = [
    { name: 'Painel de Controle', link: '/', icon: MdOutlineDashboard },
    { name: 'user', link: '/', icon: AiOutlineUser },
    { name: 'messages', link: '/', icon: FiMessageSquare },
    { name: 'analytics', link: '/', icon: TbReportAnalytics, margin: true },
    { name: 'File Manager', link: '/', icon: FiFolder },
    { name: 'Cart', link: '/', icon: FiShoppingCart },
    { name: 'Saved', link: '/', icon: AiOutlineHeart, margin: true },
    { name: 'Setting', link: '/', icon: RiSettings4Line },
  ]
  const [open, setOpen] = useState(false)
  return (
    <div
      className={`bg-[#A1D7E2] min-h-screen ${
        open ? 'w-60' : 'w-16'
      } duration-500 text-gray-100 px-4 absolute`}
    >
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          color="black"
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative text-black">
        {menus?.map((menu, i) => (
          <a
            href={menu?.link}
            key={i}
            className={` ${
              menu?.margin && 'mt-5'
            } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-100 rounded-md`}
          >
            <div>
              {React.createElement(menu?.icon, { size: '20', color: 'black' })}
            </div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && 'opacity-0 translate-x-28 overflow-hidden '
              }`}
            >
              {menu?.name}
            </h2>
            <h2
              className={`${
                open && 'hidden'
              } absolute left-48 bg-white  font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-10 group-hover:duration-300 group-hover:w-fit  `}
            >
              {menu?.name}
            </h2>
          </a>
        ))}
      </div>
    </div>
  )
}
