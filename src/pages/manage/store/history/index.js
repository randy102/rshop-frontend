import React from 'react'
import Grid from 'components/admin/Grid'
import { useQuery } from '@apollo/react-hooks'
import { GET_STORE_TRANSFER } from './queries'
import { message, Tag } from 'antd'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'
import { Moment } from 'utils/moment'
import StockExpand from './stockExpand'

export default function History() {
  const [currentShop] = useRecoilState(CURRENT_SHOP)

  const { data, refetch } = useQuery(GET_STORE_TRANSFER, { variables: { idShop: currentShop?._id } })
  console.log(data)

  return (
    <div>
      <Grid
        data={data?.storeTransfers}
        showSelection={false}
        expandRender={row => <StockExpand data={row.items}/>}
        colDef={[
          {
            title: 'Thể loại',
            dataIndex: 'type',
            key: 'type',
            render: type => {
              switch(type){
                case 'IMPORT': return <Tag color='success'>Nhập kho</Tag>
                case 'EXPORT': return <Tag color='red'>Xuất kho</Tag>
                case 'TRANSFER': return <Tag color='blue'>Chuyển kho</Tag>
                default: return <Tag color='gold'>Bán hàng</Tag>
              }
            }
          },
          {
            title:'Từ kho',
            dataIndex: ['src','name'],
            key: 'src'
          },
          {
            title:'Đến kho',
            dataIndex: ['des','name'],
            key: 'des'
          },
          {
            title:'Ghi chú',
            dataIndex: 'note',
            key: 'note'
          },
          {
            title:'Người thực hiện',
            dataIndex: ['creator','profile','fullName'],
            key: 'src'
          },
          {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: val => Moment(val).format('DD-M-YYYY')
          }
        ]}
        headDef={[
          {
            type: 'refresh',
            onClick: () => {
              const hideLoading = message.loading()
              refetch().then(hideLoading)
            }
          }
        ]}
      />
    </div>
  )
}
