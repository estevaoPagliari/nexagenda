'use client'
import React, { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
  getDay,
} from 'date-fns';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';

interface CalendarioProps {}

export const CalendarioMenu: React.FC<CalendarioProps> = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<string>('');

  const diasDoMes: Date[] = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const diasVazios: null[] = new Array(getDay(diasDoMes[0])).fill(null);

  const avancarMes = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const retrocederMes = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleDaySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(event.target.value);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <FaRegArrowAltCircleLeft size={30} onClick={retrocederMes} />
        <h2 className="text-2xl font-bold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <FaRegArrowAltCircleRight size={30} onClick={avancarMes} />
      </div>
      <div className="grid grid-cols-7 gap-4">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((diaSemana) => (
          <div key={diaSemana} className="text-center p-2 border">
            {diaSemana}
          </div>
        ))}
        {diasVazios.map((_, index) => (
          <div key={`empty-${index}`} className="text-center p-2 border"></div>
        ))}
        {diasDoMes.map((dia, index) => (
          <div key={index} className="text-center p-2 border">
            <select
              onChange={handleDaySelect}
              value={selectedDay}
              className="w-full"
            >
              <option value="" disabled>
                Selecione o dia
              </option>
              {[...Array(31)].map((_, i) => (
                <option key={i} value={(i + 1).toString()}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="mt-4">
        {selectedDay && (
          <p>
            Você selecionou o dia {selectedDay} de {format(currentDate, 'MMMM')}
          </p>
        )}
      </div>
    </div>
  );
};