import React from 'react'
import { Switch, Route } from 'react-router-dom'


import AdminContent from 'components/admin-content/AdminContent'

export default function ManageRoute({ match, routeConfigs }) {

  return (
    <Switch>
      {routeConfigs.map(({ path, exact, parent, defaultRoute }) => parent === undefined && (
        <Route
          exact={!!exact}
          path={match.path + path}
          render={(props) => (
            <AdminContent
              defaultRoute={defaultRoute}
              match={props.match}
              parent={path}
              routeConfigs={routeConfigs}
              location={props.location}
            />
          )}
        />
      ))}
    </Switch>
  )
}
