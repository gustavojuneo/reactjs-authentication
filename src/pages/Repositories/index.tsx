import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/auth'

import api from '../../services/api'

import { Container } from './styles'

interface RepositoriesProps {
  id: number
  name: string
  owner: string
  url: string
}

const Repositories: React.FC = () => {
  const { user, signOut } = useAuth()
  const [repositories, setRepositories] = useState<RepositoriesProps[]>([])

  useEffect(() => {
    ;(async () => {
      const { data } = await api.get('/repos')

      setRepositories(data)
    })()
  }, [])

  return (
    <Container>
      <h1>Olá {user?.name}</h1>
      <ul>
        {repositories.map(repository => (
          <li key={repository.id}>{repository.name}</li>
        ))}
      </ul>
      <button onClick={signOut}>Sair</button>
    </Container>
  )
}

export default Repositories
