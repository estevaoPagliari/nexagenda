import React, { useState, ChangeEvent } from 'react'

export function AgendadoDia() {
  // Estado para armazenar as atividades do dia
  const [activities, setActivities] = useState<string[]>(
    Array.from({ length: 24 }, () => ''),
  )

  // Função para atualizar a atividade em uma determinada hora
  const updateActivity = (hour: number, activity: string) => {
    setActivities((prevActivities) => {
      const newActivities = [...prevActivities]
      newActivities[hour] = activity
      return newActivities
    })
  }

  return (
    <div className="bg-gray-200 p-4 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Calendário Diário</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Coluna de Horas */}
        <div className="col-span-1">
          {Array.from({ length: 24 }).map((_, hour) => (
            <div key={hour} className="text-right">
              {hour < 10 ? `0${hour}:00` : `${hour}:00`}
            </div>
          ))}
        </div>
        {/* Coluna de Atividades */}
        <div className="col-span-1">
          {activities.map((activity, hour) => (
            <div key={hour} className="border p-2 mb-2">
              <p className="mb-1">{hour < 10 ? `0${hour}:00` : `${hour}:00`}</p>
              <textarea
                className="w-full h-16 resize-none"
                value={activity}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  updateActivity(hour, e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
