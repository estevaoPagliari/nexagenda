'use client'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { handleOAuthCode } from '@/api/login'
import { redirect } from 'next/navigation'

const schema = yup.object({
  email: yup.string().email('Email Invalido').required('Campo obrigatório'),
  senha: yup
    .string()
    .min(8, 'A senha deve ter no minimo 8 caracteres')
    .required('Campo obrigatório'),
})

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  interface FormData {
    email: string
    senha: string
  }

  async function handleCreateUser(data: FormData): Promise<void> {
    console.log('teste')
    const { email, senha } = data
    console.log(data)
    handleOAuthCode(email, senha)
  }

  function trocarpagina() {
    console.log('teste')
    redirect('./src/app/Calendario/page.tsx')
  }

  return (
    <div className="grid min-h-screen grid-cols-1 items-center">
      Bem-vindo ao NexAgenda
      <div className="w-96 h-96 bg-[#A1D7E2] mx-auto rounded-lg shadow-2xl p-4">
        {/* Header */}
        <div className=" flex justify-start font-semibold text-2xl">Login</div>
        <div className=" flex justify-start font-light text-sm">
          Informe sua email e senha
        </div>
        <div className="flex flex-col p-4 gap-4">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="email"
                placeholder="Digite seu email"
                className="rounded-sm p-2 font-medium"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.email && <text>{errors.email?.message}</text>}

          <Controller
            control={control}
            name="senha"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="password"
                placeholder="Senha"
                className="rounded-sm p-2 font-medium"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.senha && <text>{errors.senha?.message}</text>}

          <button
            className="transition text-slate-100 font-semibold rounded-md ease-in-out delay-150 bg-black hover:-translate-y-1 hover:scale-110 hover:bg-slate-600 duration-300 "
            onClick={handleSubmit(handleCreateUser)}
          >
            Login
          </button>

          <button
            className="transition text-slate-100 font-semibold rounded-md ease-in-out delay-150 bg-black hover:-translate-y-1 hover:scale-110 hover:bg-slate-600 duration-300 "
            onClick={trocarpagina}
          >
            Teste
          </button>
        </div>
      </div>
    </div>
  )
}
