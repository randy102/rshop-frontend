import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Guard from 'utils/guard'
import Logout from 'pages/logout'

var Shop = React.lazy(() => import('pages/shop/Shop'))
var Manage = React.lazy(() => import('pages/manage/Manage'))
var Admin = React.lazy(() => import('pages/admin/Admin'))
var Login = React.lazy(() => import('pages/login'))
var Register = React.lazy(() => import('pages/register'))
var RegisterConfirm = React.lazy(() => import('pages/register/confirm'))
var RegisterCreate = React.lazy(() => import('pages/register/create'))
var AuthError = React.lazy(() => import('pages/error/auth'))

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
