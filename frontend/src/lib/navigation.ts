import type { NavigateFunction } from 'react-router-dom'

let navigate: NavigateFunction | null = null

export const setNavigate = (fn: NavigateFunction) => {
  navigate = fn
}

export const redirectToLogin = () => {
  if (navigate) {
    navigate('/login', { replace: true })
  } else {
    window.location.href = '/login'
  }
}
