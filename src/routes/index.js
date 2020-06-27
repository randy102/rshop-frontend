import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Guard from 'utils/guard'
import { Jwt } from 'utils/jwt'

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
      <Route path="/register/confirm"  render={() => <RegisterConfirm/>} />
      <Route path="/register/create/:token"  render={() => <RegisterCreate/>} />
      <Route path="/register"  render={() => <Register/>} />
      <Route path="/login"  render={() => <Login/>} />
      <Route path="/logout" render={() => {Jwt.clear(); return <Redirect to='/'/>}}/>
      <Route path="/error/auth" render={() => <AuthError/>}/>

      <Route path="/shop" render={() => <Shop/>} />
      <Route path="/manage" render={() => <Guard><Manage/></Guard>} />
      <Route path="/admin" render={() => <Guard><Admin/></Guard>}/>
    </Switch>
  )
}
