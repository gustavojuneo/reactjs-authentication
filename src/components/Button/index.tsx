import React from 'react'

import { Container } from './styles'

interface Props {
  children: string
}

const Button: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <Container>
      <button {...rest}>{children}</button>
    </Container>
  )
}

export default Button
