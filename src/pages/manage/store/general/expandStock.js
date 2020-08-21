import React, { useEffect } from 'react'
import Grid from 'components/admin/Grid'
import { useQuery } from '@apollo/react-hooks'
import { GET_STORE_STOCKS } from './queries'
import Image from 'components/commons/Image'
import { Moment } from 'utils/moment'
import Loader from 'components/admin/Loader'


export default function ExpandStockGrid({ idShop, idStore, toggleRefetch }) {
  const { data, refetch, loading } = useQuery(GET_STORE_STOCKS, { variables: { idShop, idStore } })
  
  useEffect(() =>{ refetch() }, [toggleRefetch])

  if(loading) return <Loader/>

  return data?.stocksByStore.length ? (
      <Grid
        showSelection={false}
        data={data.stocksByStore}
        colDef={[
          {
            title: '',
            dataIndex: 'imgs',
            key: 'img',
            render: imgs => imgs?.length && <Image style={{ width: 80 }} fromAws src={imgs[0]} />
          },
          {
            title: 'Sản phẩm',
            dataIndex: ['product', 'name'],
            key: 'product'
          },
          {
            title: 'Phân loại',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: 'Thể loại',
            dataIndex: ['product', 'category', 'name'],
            key: 'category'
          },
          {
            title: 'Thương hiệu',
            dataIndex: ['product', 'brand', 'name'],
            key: 'brand'
          },
          {
            title: 'Mã hàng',
            dataIndex: 'code',
            key: 'code'
          },
          {
            title: 'Số lượng',
            dataIndex: 'records',
            key: 'quantity',
            render: records => records.find(r => r.store._id === idStore)?.quantity
          },
          {
            title: 'Cập nhật lần cuối',
            dataIndex: 'records',
            key: 'updatedAt',
            render: records => {
              const record = records.find(r => r.store._id === idStore)
              const lastUpdate = record.updatedAt || record.createdAt
              return Moment(lastUpdate).format('DD-M-YYYY')
            }
          }
        ]}
      />
  ) : 'Không có dữ liệu'
}
