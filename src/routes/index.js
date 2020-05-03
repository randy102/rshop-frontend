import React from 'react'
import { Switch, Route } from 'react-router-dom'


export default function IndexRoute() {
  return (
    <Switch>
      <Route path="/shop" component={React.lazy(() => import('pages/shop/Shop'))} />
      <Route path="/manage" component={React.lazy(() => import('pages/manage/Manage'))} />
      <Route path="/admin" component={React.lazy(() => import('pages/admin/Admin'))}/>
    </Switch>
  )
}
