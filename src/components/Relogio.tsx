'use client'
import React, { useState, useEffect } from 'react';

export function Relogio() {
  const [dataAtual, setDataAtual] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDataAtual(new Date());
    }, 1000);

    // Limpando o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []); // Executa o efeito apenas uma vez no início

  const diaSemana = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(dataAtual);
  const dataFormatada = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(dataAtual);
  const horaFormatada = new Intl.DateTimeFormat('pt-BR', { hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(dataAtual);

  return (
    <div className="container mx-auto">
      <div className='flex flex-row items-center gap-2'>
        <h2 className="text-xl font-bold">Hora Atual: {horaFormatada}</h2>
      </div>
      <div className="flex flex-row items-center gap-2 mb-4">
        <h2 className="text-xl font-bold">{diaSemana} : {dataFormatada}</h2>
      </div>

    </div>
  );
}