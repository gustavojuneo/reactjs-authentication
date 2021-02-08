import { useState, useEffect } from 'react'
import history from '../../history'
import api from '../../services/api'

export interface User {
  name: string
  company: string
  website: string
}

export interface AuthContextProps {
  authenticated: boolean
  loading: boolean
  user: User | null
  signIn(): Promise<void>
  signOut(): void
}

export default function useProvider() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storagedToken = localStorage.getItem('token')
    const storagedUser = localStorage.getItem('user')

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser))
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(storagedToken)}`
    }

    setLoading(false)
  }, [])

  async function signIn() {
    const { data } = await api.post('/authentication')

    localStorage.setItem('token', JSON.stringify(data.token))
    localStorage.setItem('user', JSON.stringify(data.user))
    api.defaults.headers.Authorization = `Bearer ${data.token}`
    setUser(data.user)
    history.push('/repositories')
  }

  function signOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    api.defaults.headers.Authorization = undefined
    setUser(null)
    history.push('/')
  }

  return { authenticated: !!user, loading, user, signIn, signOut }
}
