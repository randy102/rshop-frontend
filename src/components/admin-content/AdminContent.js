import React from 'react'
import Subbar from 'components/subbar/Subbar'
import InnerContent from 'components/inner-content/InnerContent'

export default function AdminContent({defaultRoute, match, parent, routeConfigs, location}) {
  return (
    <>
      <Subbar
        defaultRoute={defaultRoute}
        match={match}
        parent={parent}
        routeConfigs={routeConfigs}
        location={location}
      />
      <InnerContent
        match={match}
        parent={parent}
        routeConfigs={routeConfigs}
      />
    </>
  )
}
