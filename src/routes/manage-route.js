import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ManageRouteConfig from 'configs/manage-routes'
import AdminContent from 'components/admin-content/AdminContent'

export default function ManageRoute({ match }) {

  return (
    <Switch>
      {ManageRouteConfig.map(({ path, component, exact, parent, defaultRoute }) => parent === undefined && (
        <Route
          exact={!!exact}
          path={match.path + path}
          render={(props) => (
            <AdminContent
              defaultRoute={defaultRoute}
              match={props.match}
              parent={path}
              routeConfigs={ManageRouteConfig}
              location={props.location}
            />
          )}
        />
      ))}
    </Switch>
  )
}
