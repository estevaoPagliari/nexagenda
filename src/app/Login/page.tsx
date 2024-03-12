'use client'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { handleOAuthCode } from '@/api/login'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const schema = yup.object({
  email: yup.string().email('Email Invalido').required('Campo obrigatório'),
  senha: yup
    .string()
    .min(8, 'A senha deve ter no minimo 8 caracteres')
    .required('Campo obrigatório'),
})

export default function Login() {
  const router = useRouter()
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
    const IsAuthenticated = await handleOAuthCode(email, senha)
    if (IsAuthenticated) {
      router.push('/agenda')
    }
  }

  return (
    <div className="grid min-h-screen grid-rows-6 items-center">
      <div className="flex items-center justify-center row-span-1">
        <Image
          src="/logo.png"
          width={150}
          height={150}
          quality={100}
          alt="Picture of the author"
        />
      </div>

      <div className="w-96 h-96 bg-[#A1D7E2] mx-auto rounded-lg shadow-2xl p-4 px-4 row-span-5">
        {/* Header */}
        <div className="flex-row  gap-4">
          <div className="font-semibold text-2xl">Login</div>
        </div>

        <div className="flex flex-col py-3 gap-4">
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
            className="h-10 transition text-slate-100 font-semibold rounded-md ease-in-out delay-150 bg-black hover:-translate-y-1 hover:scale-110 hover:bg-slate-600 duration-300 "
            onClick={handleSubmit(handleCreateUser)}
          >
            Login
          </button>
        </div>
        <div>Registra-se</div>
      </div>
    </div>
  )
}
