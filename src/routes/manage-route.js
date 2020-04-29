import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import ManageRouteConfig from 'configs/manage-routes'


export default function ManageRoute({ match }) {
  return (
    <div className="rui-page-wrapper">
      <header className="rui-header-wrapper">
        <div className="rui-header-brand">
          MANAGE
        </div>
      </header>

      
      <div className="rui-flex-wrapper">
        <nav className="rui-leftbar-wrapper">
          <ul>
            {ManageRouteConfig.map(route => (
              <li>
                <route.icon />
                <Link to={match.path + route.path}>{route.name}</Link>
              </li>
            ))}

          </ul>
        </nav>

        <main className="rui-content-wrapper">
          <Switch>
            {ManageRouteConfig.map(({ path, component }) => (
              <Route
                exact
                path={match.path + path}
                component={component} />
            ))}
          </Switch>
        </main>
      </div>
    </div>
  )
}
