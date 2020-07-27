import React from 'react'
import { useQuery } from "@apollo/react-hooks"
import { GET_ACTIVE_CONTRACT, GET_USER_SHOPS } from "./queries"
import { Redirect, useRouteMatch, useHistory } from "react-router-dom"
import { useSetRecoilState } from 'recoil'
import { USER_SHOPS } from 'recoil/atoms/userShops'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'

export const MiddleWare = {
  Contract,
  Shop
}

function Contract({children}){
  const { data } = useQuery(GET_ACTIVE_CONTRACT)

  if (data) {
    // If not have contract or expired
    if(!data.activeContract._id)
      return <Redirect to="/contract" />

  }

  return <>{children}</>
}

function Shop({children}){
  const {data, loading} = useQuery(GET_USER_SHOPS)
  const {params: {domain}} = useRouteMatch()
  const setUserShops = useSetRecoilState(USER_SHOPS)
  const setCurrentShop = useSetRecoilState(CURRENT_SHOP)
  const history = useHistory()

  if(!loading){
    setUserShops(data.userShops)
    const foundShop = data.userShops.find(shop => shop.domain === domain)
    if(foundShop){
      setCurrentShop(foundShop)
    } else if(data.userShops.length){
      history.push(`/${data.userShops[0].domain}/manage`)
    }
  }
  return <>{children}</> 
}