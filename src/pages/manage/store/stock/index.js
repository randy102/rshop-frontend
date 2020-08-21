import React, { useState } from 'react'
import Grid from 'components/admin/Grid'
import Form from './form'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_STOCKS } from './queries'
import { message, Tag } from 'antd'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'
import { Moment } from 'utils/moment'
import Image from 'components/commons/Image'

const CONFIG = {
  DATA_PATH: '',
  DATA_GQL: GET_STOCKS,
}

export default function Stock() {
  const [currentShop] = useRecoilState(CURRENT_SHOP)

  const [openForm, setOpenForm] = useState(false)
  const [formType, setFormType] = useState({})
  const [initRow, setInitRow] = useState()
  const { data, refetch } = useQuery(CONFIG.DATA_GQL,{variables: {idShop: currentShop?._id}})
 
  function handleOpenForm(type, typeName){
    setOpenForm(true)
    setFormType({type, typeName})
  }
  console.log(data?.stocks)
  return (
    <div>
      <Grid
        data={data?.stocks}
        showSelection={false}
        colDef={[
          {
            title: '',
            dataIndex: 'imgs',
            key: 'img',
            render: imgs => imgs?.length && <Image style={{width: 80}} fromAws src={imgs[0]}/>
          },
          {
            title: 'Sản phẩm',
            dataIndex: ['product','name'],
            key: 'product'
          },

          {
            title: 'Phân loại',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: 'Mã hàng',
            dataIndex: 'code',
            key: 'code'
          },
          {
            title: 'Thể loại',
            dataIndex: ['product','category','name'],
            key: 'category'
          },
          {
            title: 'Thương hiệu',
            dataIndex: ['product','brand','name'],
            key: 'brand'
          },
          
          {
            title: 'Tổng tồn',
            dataIndex: 'records',
            key: 'quantity',
            render: records => <Tag color='blue'>{records.reduce((sum, r) => sum+r.quantity, 0)}</Tag>
          },
          {
            title: 'Phân phối',
            dataIndex: 'records',
            key: 'stores',
            render: records => records.map(r => !!r.quantity && <Tag>{r.store.name}: {r.quantity}</Tag>)
          }
        ]}

        headDef={[
          {
            name: 'Nhập kho',
            icon: 'ImportOutlined',
            onClick: () => handleOpenForm('IMPORT', 'Nhập kho')
          },
          {
            name: 'Xuất kho',
            icon: 'ExportOutlined',
            onClick: () => handleOpenForm('EXPORT', 'Xuất kho')
          },
          {
            name: 'Chuyển kho',
            icon: 'SyncOutlined',
            onClick: () => handleOpenForm('TRANSFER', 'Chuyển kho')
          },
          {
            type: 'refresh',
            onClick: () => {
              const hideLoading = message.loading()
              refetch().then(hideLoading)
            }
          }
        ]}
      />

      <Form
        formType={formType}
        openForm={openForm}
        setOpenForm={setOpenForm}
        initRow={initRow}
        setInitRow={setInitRow}
        refetch={refetch}
      />
    </div>
  )
}
