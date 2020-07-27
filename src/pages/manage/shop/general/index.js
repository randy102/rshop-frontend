import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'
import { useQuery } from '@apollo/react-hooks'
import { GET_SHOP } from './queries'
import './general.scss'
import Status from 'components/commons/Status'
import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import Form from './form'

export default function General() {
  const [currentShop] = useRecoilState(CURRENT_SHOP)
  const { data, refetch } = useQuery(GET_SHOP, { variables: { domain: currentShop?.domain } })

  const [openForm, setOpenForm] = useState(false)

  const { shopByDomain: shop } = data || {}

  return (
    <div>
      <Button onClick={()=>setOpenForm(true)} style={{marginBottom: '20px'}} icon={<EditOutlined/>}>Chỉnh sửa</Button>

      <img className='rui-manage-shop-brand' src={`${process.env.REACT_APP_S3URL}/${shop?.brandImg}`} />
      
      <div className='rui-manage-shop-wrap'>
        <div className='rui-manage-shop-item'>
          <div className='title'>Tên cửa hàng</div>
          <div className='content'>{shop?.name}</div>
        </div>

        <div className='rui-manage-shop-item'>
          <div className='title'>Tên miền</div>
          <div className='content'>{shop?.domain}.{process.env.REACT_APP_DOMAIN}</div>
        </div>

        <div className='rui-manage-shop-item'>
          <div className='title'>Tình trạng</div>
          <div className='content'>{shop?.isActive ? <Status content='Đang hoạt động'/> : <Status type='inactive' content='Dừng hoạt động'/> }</div>
        </div>

        <div className='rui-manage-shop-item'>
          <div className='title'>Chủ đề</div>
          <div className='content'>{shop?.template?.name}</div>
        </div>
      </div>
      
      <Form
        openForm={openForm}
        setOpenForm={setOpenForm}
        initRow={data?.shopByDomain}
        refetch={refetch}
      />
    </div>
  )

}
