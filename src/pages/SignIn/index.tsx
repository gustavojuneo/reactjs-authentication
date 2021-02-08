import React from 'react'
import { useAuth } from '../../contexts/auth'

import { Container } from './styles'

const SignIn: React.FC = () => {
  const { signIn } = useAuth()

  return (
    <Container>
      <button onClick={signIn}>Entrar</button>
    </Container>
  )
}

export default SignIn
