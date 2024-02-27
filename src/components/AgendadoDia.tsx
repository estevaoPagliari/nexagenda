import React, { useState, useEffect } from 'react'
import { api } from '../api/api'
import { FaRegCalendarCheck, FaRegCalendarXmark } from 'react-icons/fa6'
import { HorarioFuncionamento } from '../api/interface/InterHorarioFuncionamento'
import { userEstabelecimento } from '../api/interface/InterUserEstabelecimento'
import { Agenda } from '../api/interface/InterAgenda'
import { LoadHorario } from '../api/HorarioFuncionamento'
import { LoadAgendaDia } from '@/api/Agendamento'
import { FadeLoader } from 'react-spinners'

// Definição da interface para os dados de cada agendamento
interface AppointmentData {
  dia: string
  time: string
  clientName: string
  service: string
  timeservice?: string
}

let openingTime = ''
let closingTime = ''
let lunchStart = ''
let lunchEnd = ''

const idString = ''
const diastring = ''
const messtring = ''

// Definição da interface para os dados da data selecionada
interface DiaSelecionado {
  dataSelecionada: { dia: number; mes: number } | null
}

// Componente funcional AgendadoDia
export function AgendadoDia({
  dataSelecionada,
  id,
}: {
  dataSelecionada: DiaSelecionado['dataSelecionada']
  id?: number
}) {
  // Estado para armazenar os agendamentos
  const [appointments, setAppointments] = useState<AppointmentData[]>([])
  // Funcao Consumo Api
  const [userHorario, setUserHorario] = useState<HorarioFuncionamento[]>([])

  const [userAgenda, setUserAgenda] = useState<Agenda[]>([])

  // consulta a api e retorna horario de funcionamento
  async function fetchUserHorario() {
    try {
      const idString: string = id !== undefined ? id.toString() : ''
      const data = await LoadHorario(idString) // Passe o userId para a função Loaduser
      await setUserHorario(data)
      return data
    } catch (error) {
      // Trate erros, se necessário
      console.error('Erro ao carregar dados do usuário:', error)
    }
  }

  async function fetchAgendaDia(
    idstring: string,
    diastring: string,
    messtring: string,
  ) {
    try {
      const agenda = await LoadAgendaDia(idstring, diastring, messtring)
      await setUserAgenda(agenda)
      console.log(userAgenda)
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error)
    }
  }

  const fetchAppointments = async () => {
    try {
      if (dataSelecionada) {
        const { dia, mes } = dataSelecionada
        const response = await api.get(`/api/appointments/${dia}/${mes}`, {
          headers: {},
        })
        const idString: string = id !== undefined ? id.toString() : ''
        const diastring: string = dia !== undefined ? dia.toString() : ''
        const messtring: string = mes !== undefined ? mes.toString() : ''
        await fetchAgendaDia(idString, diastring, messtring)
        setAppointments(response.data)
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      fetchUserHorario()
    } else console.log('valor nao carregado')
  }, [id])

  useEffect(() => {
    if (userHorario[0] !== undefined) {
      openingTime = userHorario[0].horarioAbertura
      closingTime = userHorario[0].horarioFechamento
      lunchStart = userHorario[0].horarioAlmocoInicio
      lunchEnd = userHorario[0].horarioAlmocoFim
    }
  }, [userHorario[0]])

  useEffect(() => {
    fetchAppointments()
  }, [dataSelecionada])

  const generateEmptyAppointments = (
    openingTime: string,
    closingTime: string,
    lunchStart: string,
    lunchEnd: string,
    appointments: AppointmentData[],
  ) => {
    const emptyAppointments: AppointmentData[] = []
    let currentTime = openingTime

    // Criar uma lista de todos os horários ocupados
    const occupiedTimes: { startTime: string; endTime: string }[] = []
    appointments.forEach((appointment) => {
      const endTime = incrementTime(
        appointment.time,
        parseInt(appointment.timeservice || '0'),
      )
      occupiedTimes.push({ startTime: appointment.time, endTime })
    })

    // Gerar uma lista de todos os horários possíveis no intervalo de horário de trabalho
    while (currentTime < closingTime) {
      const isDuringLunchBreak =
        currentTime >= lunchStart && currentTime < lunchEnd

      // Verificar se o horário está dentro de um intervalo ocupado
      const isDuringService = occupiedTimes.some(
        (occupiedTime) =>
          currentTime >= occupiedTime.startTime &&
          currentTime < occupiedTime.endTime,
      )

      // Se o horário não estiver ocupado e não estiver durante o intervalo de almoço, adicionar à lista de horários vazios
      if (!isDuringLunchBreak && !isDuringService) {
        emptyAppointments.push({
          dia: '',
          time: currentTime,
          clientName: 'Horário vago',
          service: 'Nenhum serviço agendado',
        })
      }

      currentTime = incrementTime(currentTime, 15)
    }

    return emptyAppointments
  }

  // Função para incrementar o tempo
  const incrementTime = (time: string, minutes: number): string => {
    const [hour, minute] = time.split(':').map(Number)
    const newMinute = (minute + minutes) % 60
    const newHour = hour + Math.floor((minute + minutes) / 60)
    return `${String(newHour).padStart(2, '0')}:${String(newMinute).padStart(
      2,
      '0',
    )}`
  }

  // Gerar os horários vazios
  const emptyAppointments = generateEmptyAppointments(
    openingTime,
    closingTime,
    lunchStart,
    lunchEnd,
    appointments,
  )

  // Concatenar os agendamentos com os horários vazios e ordená-los
  const allAppointments = [...appointments, ...emptyAppointments].sort(
    (a, b) => (a.time > b.time ? 1 : -1),
  )

  // Retornar o JSX do componente
  return (
    <div className="bg-slate-200/40 rounded-xl py-2 px-4 sm:px-4 lg:px-6 overflow-y-auto h-96">
      {userHorario && userHorario.length > 0 ? (
        <div>
          <div>
            <div className="flex flex-row mb-8  items-center justify-between">
              <h1 className="text-2xl font-semibold">
                Agenda do Estabelecimento
              </h1>
              <p className="text-xl font-semibold">
                Dia Selecionado : {dataSelecionada?.dia} /{' '}
                {dataSelecionada?.mes}
              </p>
            </div>

            <div>
              {/* Este é um comentário em JSX 
              {userHorario && userHorario.length > 0 && (
                <div>
                  <div>{userHorario[0].horarioAbertura}</div>
                  <div>{userHorario[0].horarioAlmocoInicio}</div>
                  <div>{userHorario[0].horarioAlmocoFim}</div>
                  <div>{userHorario[0].horarioFechamento}</div>
                </div>
                
              )}
              */}
            </div>

            <div className="grid grid-cols-1 gap-4">
              {allAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 p-2 bg-slate-200/50 rounded-xl cursor-pointer hover:bg-blue-100 transition duration-300 ${
                    appointment.clientName === 'Horário vago'
                      ? 'text-red-500 font-normal bg-red-100'
                      : 'text-green-500 font-semibold bg-green-100'
                  }`}
                >
                  <div className="ml-1">
                    {appointment.clientName === 'Horário vago' ? (
                      <FaRegCalendarXmark size={30} />
                    ) : (
                      <FaRegCalendarCheck size={30} />
                    )}
                  </div>
                  <div className="mr-4">{appointment.time}</div>
                  <div className="flex-1">
                    <div>{`Cliente: ${appointment.clientName}`}</div>
                    <div>{`Serviço: ${appointment.service}`}</div>
                    {appointment.timeservice && (
                      <div>{`Tempo de serviço: ${appointment.timeservice}`}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {userAgenda ? (
              userAgenda.map((agenda, index) => (
                <div key={index} className="flex flex-row gap-2">
                  <div className="flex justify-center items-center p-5">
                    <p>{agenda.horario}</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    {agenda.Estabelecimento && (
                      <div>
                        <p>Cliente: {agenda.Cliente.nome}</p>
                        <p>Serviço: {agenda.TipoServico.nome}</p>
                        <p>Tempo: {agenda.TipoServico.tempoServico}</p>
                        {/* Acesse outros campos de Estabelecimento conforme necessário */}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>Carregando...</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-1 justify-center items-center h-80">
          <FadeLoader color="#A1D7E2" loading={true} />
        </div>
      )}
    </div>
  )
}
