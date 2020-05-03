import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

export default function Dashboard({ match, location }) {
  return (
    <div>
      <div className="rui-subbar-wrapper">
        <div className="rui-subbar-item">
          <Link className={location.pathname.includes('/item1') ? 'active' : ''} to={match.path + '/item1'}>Item 1</Link>
        </div>

        <div className="rui-subbar-item">
          <Link className={location.pathname.includes('/item2') ? 'active' : ''} to={match.path + '/item2'}>Item 2</Link>
        </div>

        <div className="rui-subbar-item">
          <Link className={location.pathname.includes('/item3') ? 'active' : ''} to={match.path + '/item3'}>Item 3</Link>
        </div>
      </div>

      <Switch>
        <Route path={match.path + '/item1'}>
          Content 1
        </Route>

        <Route path={match.path + '/item2'}>
          Content 2
        </Route>

        <Route path={match.path + '/item3'}>
          Content 3
        </Route>
      </Switch>
    </div>
  )
}
