import React from 'react'
import Grid from 'components/admin/Grid'
import { useQuery } from '@apollo/react-hooks'
import { GET_PRODUCT_STOCKS } from './queries'
import Image from 'components/commons/Image'
import { currencyFormatter } from 'utils/string'
import Loader from 'components/admin/Loader'


export default function ExpandStockGrid({ idShop, idProduct }) {
  const { data, loading } = useQuery(GET_PRODUCT_STOCKS, { variables: { idShop, idProduct } })

  if(loading) return <Loader/>

  return data?.stocksByProduct.length ? (
    <Grid
      showSelection={false}
      pagination={false}
      data={data.stocksByProduct}
      colDef={[
        {
          title: '',
          dataIndex: 'imgs',
          key: 'img',
          render: imgs => imgs?.length && <Image style={{ width: 80 }} fromAws src={imgs[0]} />
        },
        {
          title: 'Phân loại',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Giá',
          dataIndex: 'salePrice',
          key: 'price',
          render: price => currencyFormatter(price) + ' đ'
        },
        {
          title: 'Thông số',
          dataIndex: 'info',
          key: 'info',
          render: ({ long, width, height, weight }) => `${long}m x ${width}m x ${height}m | ${weight} kg`
        },
      ]}
    />
  ) : 'Không có dữ liệu'
}
