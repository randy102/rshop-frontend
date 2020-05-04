import React from 'react'
import { Route, Switch } from 'react-router-dom'

export default function InnerContent({ match, parent, routeConfigs }) {
  return (
    <div className="rui-inner-content">
      <Switch>
        {routeConfigs.filter(route => route.parent === parent).map(({ path, component, exact }) => (
          <Route
            exact={!!exact}
            path={match.path + path}
            component={component}
          />
        ))}
      </Switch>
    </div>
  )
}
