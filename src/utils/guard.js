import React from 'react'
import { Jwt } from './jwt'
import { Redirect } from 'react-router-dom'

export default function Guard({children}) {
  if(!Jwt.isSet())
    return <Redirect to='/error/auth'/>
  return <>{children}</>
}
