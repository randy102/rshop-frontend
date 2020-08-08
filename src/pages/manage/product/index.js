import React from 'react'
import { getChildRoutes } from 'utils/routes'
import ManageRouteConfig from 'configs/routes/manageRouteConfig'
import Body from 'components/admin/Body'
import General from './general'
import Category from './category'
import Brand from './brand'

const Components = {
  General,
  Category,
  Brand
}

export default function Product() {
  const dashboardRoutes = getChildRoutes('Product', ManageRouteConfig)
  return (
    <Body
      title={"Sản phẩm"}
      routes={dashboardRoutes}
      components={Components}
    />
  )
}
