'use client'
import React, { useState } from 'react'
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
} from 'date-fns'
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from 'react-icons/fa'

export function Calendario() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const diasDoMes = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  })

  const avancarMes = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const retrocederMes = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <FaRegArrowAltCircleLeft
          className=""
          size={30}
          onClick={retrocederMes}
        />

        <h2 className="text-2xl font-bold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <FaRegArrowAltCircleRight className="" size={30} onClick={avancarMes} />
      </div>
      <div className="grid grid-cols-7 gap-4">
        <p>s</p>
        <p>t</p>
        <p>q</p>
        <p>q</p>
        <p>s</p>
        <p>s</p>
        <p>d</p>
        {diasDoMes.map((dia, index) => (
          <div key={index} className="text-center p-2 border">
            {format(dia, 'd')}
          </div>
        ))}
      </div>
    </div>
  )
}
