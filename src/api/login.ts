import { NextResponse } from 'next/server'
import { api } from './api'
import { setCookie } from 'nookies'
import { redirect } from 'next/navigation'

export async function handleOAuthCode(email: string, senha: string) {
  try {
    console.log('teste')
    const response = await api.post('/login', {
      email,
      senha,
    })
    console.log(response.data)
    const { token } = response.data

    setCookie(null, 'token', token, {
      maxAge: 60 * 60 * 24, // 1 dia em segundos
      path: '/', // caminho do cookie (no caso, o caminho raiz)
    })

    redirect('/Home')
  } catch (error) {
    console.error('Status do erro:', error)
  }
}
