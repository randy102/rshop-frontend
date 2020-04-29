import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Admin from 'pages/admin/Admin'

export default function AdminRoute({ match }) {
  return (
    <Switch>
      <Route exact path={`${match.path}`} component={Admin} />
    </Switch>
  )
}
