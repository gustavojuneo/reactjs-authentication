import { createContext, useContext } from 'react'

import useProvider, { AuthContextProps } from './hooks/useProvider'

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider: React.FC = ({ children }) => {
  const { authenticated, loading, user, signIn, signOut } = useProvider()

  return (
    <AuthContext.Provider
      value={{ authenticated, loading, user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
