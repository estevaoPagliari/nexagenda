import { api } from './api'
import { setCookie } from 'nookies'

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

    return true
  } catch (error) {
    console.error('Status do erro:', error)
    return false
  }
}
