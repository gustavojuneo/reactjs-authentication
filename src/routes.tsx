import React from 'react'
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom'

import SignIn from './pages/SignIn'
import Repositories from './pages/Repositories'
import { useAuth } from './contexts/auth'

interface RoutesProps extends RouteProps {
  isPrivate?: boolean
}

const CustomRoutes: React.FC<RoutesProps> = ({ isPrivate, ...rest }) => {
  const { loading, authenticated } = useAuth()

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/" />
  }

  return <Route {...rest} />
}

const Routes = () => {
  return (
    <Switch>
      <CustomRoutes exact path="/" component={SignIn} />
      <CustomRoutes
        isPrivate
        exact
        path="/repositories"
        component={Repositories}
      />
    </Switch>
  )
}

export default Routes
