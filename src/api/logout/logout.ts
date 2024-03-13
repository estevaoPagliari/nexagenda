import { setCookie } from 'nookies'
export function Logout() {
  console.log('teste')
  const token = ''
  setCookie(null, 'token', token, {
    maxAge: 0, // 1 dia em segundos
    path: '/', // caminho do cookie (no caso, o caminho raiz)
  })
}
