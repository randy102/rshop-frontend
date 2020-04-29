import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ShopRoute from './shop-route'
import ManageRoute from './manage-route'
import AdminRoute from './admin-route'

export default function IndexRoute() {
  return (
    <Switch>
      <Route path="/shop" component={ShopRoute} />
      <Route path="/manage" component={ManageRoute} />
      <Route path="/admin" component={AdminRoute}/>
    </Switch>
  )
}
