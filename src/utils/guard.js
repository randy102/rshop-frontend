import React, { useEffect } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import AuthError from 'pages/error/auth'
import { useRecoilState } from 'recoil'
import { CURRENT_USER } from 'recoil/atoms/currentUser'
import Loader from 'components/admin/loader'

const GET_CURRENT_USER = gql`
  query{
    currentUser{
      _id
      isAdmin
      profile{
        fullName
      }
      credential{
        email
      }
    }
  }
`

export default function Guard({ children, onlyAdmin }) {
  var { data, loading } = useQuery(GET_CURRENT_USER)
  var [currentUser, setCurrentUser] = useRecoilState(CURRENT_USER)

  useEffect(() => {
    if (data) {
      setCurrentUser(data.currentUser)
    }
  }, [data])
 
  if (loading) return <Loader />

  if (!currentUser) return <AuthError />
  else if (onlyAdmin && !currentUser.isAdmin) return <AuthError />



  return <>{children}</>
}
