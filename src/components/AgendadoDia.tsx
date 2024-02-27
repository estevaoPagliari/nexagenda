import React, { useState, useEffect } from 'react'
import { api } from '../api/api'
import { FaRegCalendarCheck, FaRegCalendarXmark } from 'react-icons/fa6'
import { HorarioFuncionamento } from '../api/interface/InterHorarioFuncionamento'
import { AgendaNew } from '../api/interface/InterAgenda'
import { LoadHorario } from '../api/HorarioFuncionamento'
import { LoadAgendaDia } from '@/api/Agendamento'
import { FadeLoader, BarLoader } from 'react-spinners'

let openingTime = ''
let closingTime = ''
let lunchStart = ''
let lunchEnd = ''

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
  const [appointments, setAppointments] = useState<AgendaNew[]>([])
  // Funcao Consumo Api
  const [userHorario, setUserHorario] = useState<HorarioFuncionamento[]>([])

  const [userAgenda, setUserAgenda] = useState<AgendaNew[]>([])

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

  const fetchAppointments = async () => {
    try {
      if (dataSelecionada) {
        const { dia, mes } = dataSelecionada
        const response = await api.get(
          `/agendaservicodiaestabelecimento/${id}/${dia}/${mes}`,
          {
            headers: {},
          },
        )
        setAppointments(response.data)
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      fetchUserHorario()
      fetchAppointments()
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
    appointments: AgendaNew[],
  ) => {
    const emptyAppointments: AgendaNew[] = []
    let currentTime = openingTime

    // Criar uma lista de todos os horários ocupados
    const occupiedTimes: { startTime: string; endTime: string }[] = []
    appointments.forEach((appointment) => {
      const endTime = incrementTime(
        appointment.horario,
        parseInt(appointment.TipoServico.tempoServico || '0'),
      )
      occupiedTimes.push({ startTime: appointment.horario, endTime })
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
          horario: currentTime,
          Cliente: {
            id: 0,
            nome: 'Horário vago',
            email: '',
            senha: '',
            cpf: 0,
            telefone: 0,
            createdAt: '',
            updatedAt: '',
          },
          TipoServico: {
            id: 0,
            nome: 'Nenhum serviço agendado',
            tempoServico: '',
            UserEstabelecimentoId: 0,
          },
          id: 0,
          dia: 0,
          mes: 0,
          ano: 0,
          tipoServicoId: 0,
          estabelecimentoId: 0,
          clienteId: 0,
          recursoId: 0,
          Estabelecimento: {
            id: 0,
            nome: '',
            email: '',
            senha: '',
            cpf: 0,
            telefone: 0,
            createdAt: '',
            updatedAt: '',
          },
          Recurso: {
            id: 0,
            nome: '',
            estabelecimentoId: 0,
          },
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
    (a, b) => (a.horario > b.horario ? 1 : -1),
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
            {userAgenda ? (
              <div className="grid grid-cols-1 gap-4">
                {allAppointments.map((appointment, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 p-2 bg-slate-200/50 rounded-xl cursor-pointer hover:bg-blue-100 transition duration-300 ${
                      appointment.Cliente.nome === 'Horário vago'
                        ? 'text-red-500 font-normal bg-red-100'
                        : 'text-green-500 font-semibold bg-green-100'
                    }`}
                  >
                    <div className="ml-1">
                      {appointment.Cliente.nome === 'Horário vago' ? (
                        <FaRegCalendarXmark size={30} />
                      ) : (
                        <FaRegCalendarCheck size={30} />
                      )}
                    </div>
                    <div className="mr-4">{appointment.horario}</div>
                    <div className="flex-1">
                      <div>{`Cliente: ${appointment.Cliente.nome}`}</div>
                      <div>{`Serviço: ${appointment.TipoServico.nome}`}</div>
                      {appointment.TipoServico && (
                        <div>{`Tempo de serviço: ${appointment.TipoServico.tempoServico}`}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-1 h-80">
                <BarLoader color="#A1D7E2" loading={true} />
              </div>
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
