import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Shop from 'pages/shop/Shop'

export default function ShopRoute({ match }) {

  return (
    <Switch>
      <Route exact path={`${match.path}/:shopId`} component={Shop} />
    </Switch>
  )
}
