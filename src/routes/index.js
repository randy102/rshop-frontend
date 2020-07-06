import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Guard from 'utils/guard'
import Logout from 'pages/logout'

const Shop = React.lazy(() => import('pages/shop/Shop'))
const Manage = React.lazy(() => import('pages/manage/Manage'))
const Admin = React.lazy(() => import('pages/admin/Admin'))
const Login = React.lazy(() => import('pages/login'))
const Register = React.lazy(() => import('pages/register'))
const RegisterConfirm = React.lazy(() => import('pages/register/confirm'))
const RegisterCreate = React.lazy(() => import('pages/register/create'))
const AuthError = React.lazy(() => import('pages/error/auth'))

export default function IndexRoute() {
  return (
    <Switch>
      <Route path="/register/confirm" component={RegisterConfirm} />
      <Route path="/register/create/:token" component={RegisterCreate} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/error/auth" component={AuthError} />
      <Route path="/logout" component={Logout} />

      <Route path="/shop" component={Shop} />
      <Route path="/manage" render={() => <Guard><Manage /></Guard>} />
      <Route path="/admin" render={() => <Guard onlyAdmin><Admin /></Guard>} />
    </Switch>
  )
}
