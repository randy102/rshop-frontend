import React from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

export default function Router({ routes, components }) {
  var match = useRouteMatch()
  var history = useHistory()
  const defaultPath = routes.find(r => r.default).path
  const isDefaultPath = (history.location.pathname.length - match.path.length) <= 1
  
  if(isDefaultPath) history.replace(match.path + defaultPath)

  return (
    <div>
      <Switch>
        {routes.map(route => {
          let Component = components[route.component]
          return (<Route
            key={route.path}
            path={match.path + route.path}
            render={() => {
              document.title = route.name
              return <Component/>
            }}
          />)
        })}
      </Switch>
    </div>
  )
}
