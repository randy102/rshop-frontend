import React from 'react'
import Grid from 'components/admin/Grid'
import { useQuery } from '@apollo/react-hooks'
import { GET_PRODUCT_STOCKS } from './queries'
import Image from 'components/commons/Image'


export default function ExpandStockGrid({idShop, idProduct}) {
  const { data } = useQuery(GET_PRODUCT_STOCKS,{variables: {idShop,idProduct}})

  return (
    <div>
      <Grid
        showSelection={false}
        pagination={false}
        data={data?.stocksByProduct}
        colDef={[
          {
            title: '',
            dataIndex: 'imgs',
            key: 'img',
            render: imgs => imgs?.length && <Image style={{width: 80}} fromAws src={imgs[0]}/>
          },
          {
            title: 'Phân loại',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: 'Giá',
            dataIndex: 'salePrice',
            key: 'price'
          },
          {
            title: 'Thông số',
            dataIndex: 'info',
            key: 'info',
            render: ({long,width,height,weight}) => `${long}m x ${width}m x ${height}m | ${weight} kg`
          },
        ]}
      />

     
    </div>
  )
}
