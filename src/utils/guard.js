import React, { useEffect } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import AuthError from 'pages/error/auth'
import { useRecoilState } from 'recoil'
import { CURRENT_USER } from 'recoil/atoms/currentUser'
import Loader from 'components/admin/loader'
import { useHistory } from 'react-router-dom'
import { Jwt } from './jwt'
import CredentialError from 'pages/error/credential'
import PermissionError from 'pages/error/permission'

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
  var { data, loading, error } = useQuery(GET_CURRENT_USER)
  // var [currentUser, setCurrentUser] = useRecoilState(CURRENT_USER)
  // useEffect(() => {
  //   if (data) {
  //     setCurrentUser(data.currentUser)
  //   }
  // }, [data])
  
  // Not have token
  if(!Jwt.isSet()) return <AuthError />
  
  if (loading) return <Loader />

  // Token invalid or credentialHash was changed
  if(error) {
    Jwt.clear()
    return <CredentialError />
  }

  // Not have permission
  if (!loading && onlyAdmin && !data.currentUser.isAdmin) return <PermissionError />

  return <>{children}</>
}
