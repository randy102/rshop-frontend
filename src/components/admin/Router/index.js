import React from 'react'
import { Switch, Route, useRouteMatch, useHistory, useLocation } from 'react-router-dom'
import NotFoundError from 'pages/error/notfound'
import PermissionError from 'pages/error/permission'
import Loader from '../Loader'

export default function Router({ routes, components, permissions=[], isMaster, loading=false }) {
  const match = useRouteMatch()
  const history = useHistory()
  const location = useLocation()
  
  const defaultPath = routes.find(r => r.default).path
  const isDefaultPath = (location.pathname.length - match.url.length) <= 1
  const defaultUrl = match.path.replace(/:domain/,match.params.domain) + defaultPath


  if(isDefaultPath) history.replace(defaultUrl)

  return (
    <div>
      <Switch>
        {routes.map(route => {
          let Component = components[route.component]
          return (<Route
            key={route.path}
            path={match.path + route.path}
            render={() => {
              if(loading)
                return <Loader/>

              if(route.require && !isMaster && !permissions.some(p => p === route.require))
                return <PermissionError/>
              
              document.title = route.name
              return <Component/>
            }}
          />)
        })}
        <Route key="default" path={match.path} component={NotFoundError}/>
      </Switch>
    </div>
  )
}
