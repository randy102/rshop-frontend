import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { CURRENT_USER } from 'recoil/atoms/currentUser'
import { Jwt } from 'utils/jwt'

export default function Logout() {
  const setCurrentUser = useSetRecoilState(CURRENT_USER)

  // eslint-disable-next-line
  useEffect(() => {
    Jwt.clear()
    setCurrentUser(undefined)
  },[])

  return (
    <Redirect to='/' />
  )
}
