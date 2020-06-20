import React from 'react'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'

export default function Router({routes, components}) {
  const match = useRouteMatch()
  const defaultPath = routes.find(r => r.default).path
  return (
    <div>
      <Redirect from={match.path} to={match.path + defaultPath}/>
      <Switch>
        {routes.map(route =>
          <Route  key={route.path} path={match.path + route.path} component={components[route.component]} />
        )}
      </Switch>
    </div>
  )
}
