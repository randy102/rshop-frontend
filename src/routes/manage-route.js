import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ManageRouteConfig from 'configs/manage-routes'

export default function ManageRoute({ match }) {

  return (
    <Switch>
      {ManageRouteConfig.map(({ path, component, exact, parent }) => parent === undefined && (
        <Route
          exact={!!exact}
          path={match.path + path}
          component={component}
        />
      ))}
    </Switch>
  )
}
