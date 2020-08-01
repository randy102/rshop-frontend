import React, { useEffect } from 'react'
import { useQuery } from "@apollo/react-hooks"
import { GET_ACTIVE_CONTRACT, GET_USER_SHOPS } from "./queries"
import { Redirect, useRouteMatch, useHistory, useLocation } from "react-router-dom"
import { useSetRecoilState, useRecoilState } from 'recoil'
import { USER_SHOPS } from 'recoil/atoms/userShops'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'
import { Result, Button } from 'antd'
import Loader from 'components/admin/Loader'

export const MiddleWare = {
  Contract,
  Domain,
  Shop
}

//Check if user have active contract, ortherwise redirect to contract signing page
function Contract({ children }) {
  const { data } = useQuery(GET_ACTIVE_CONTRACT)

  if (data) {
    // If not have contract or expired
    if (!data.activeContract._id)
      return <Redirect to="/contract" />

  }

  return <>{children}</>
}

//Check if domain exist, otherwise redirect to the first shop
function Domain({ children }) {
  const { data, loading } = useQuery(GET_USER_SHOPS)
  const { params: { domain } } = useRouteMatch()
  const setUserShops = useSetRecoilState(USER_SHOPS)
  const setCurrentShop = useSetRecoilState(CURRENT_SHOP)
  const history = useHistory()

  useEffect(() => {
    if (!loading) {
      setUserShops(data.userShops)
      const foundShop = data.userShops.find(shop => shop.domain === domain)
      if (foundShop) {
        setCurrentShop(foundShop)
      } else if (data.userShops.length) {
        history.push(`/${data.userShops[0].domain}/manage`)
      }
    }
  },[data,domain])
  return <>{children}</>
}

function Shop({ children }) {
  const [userShops] = useRecoilState(USER_SHOPS)
  const location = useLocation()
  
  const exceptedPath = [
    '/0/manage/account',
    '/0/manage/shop/create'
  ]
  const inExcepted = exceptedPath.some(path => location.pathname.includes(path))
  if(!userShops) return <Loader/>
  if (!userShops?.length && !inExcepted)
    return (<Result
      title="Bạn chưa có cửa hàng nào!"
      extra={<Button
        href='/0/manage/shop/create'
        type="primary">
        Tạo mới
      </Button>}
    />)
  return <>{children}</>
}