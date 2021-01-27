import React, { useEffect, useState } from 'react'
import Drawer from 'components/admin/Drawer'
import RForm from 'components/admin/Form'

import { Form as AntForm, message, List, Tag } from 'antd'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { TRANSFER_STORE, GET_STOCKS } from './queries'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'
import { GET_STORE } from '../general/queries'
import RSelect from 'components/admin/Form/RSelect'
import './form.scss'
import Image from 'components/commons/Image'
import TransferItems from './TransferItems'
import RInput from 'components/admin/Form/RInput'

export default function Form({ openForm, setOpenForm, formType: { type, typeName }, initRow, setInitRow, refetch }) {
  const [currentShop] = useRecoilState(CURRENT_SHOP)

  const [items, setItems] = useState([])
  const [idSrc, setIdSrc] = useState()
  const [idDes, setIdDes] = useState()

  const [form] = AntForm.useForm()
  const [transfer] = useMutation(TRANSFER_STORE)
  const { data: storeData, refetch: storeRefetch } = useQuery(GET_STORE, { variables: { idShop: currentShop._id } })
  const { data: stockData, refetch: stockRefetch } = useQuery(GET_STOCKS, { variables: { idShop: currentShop._id } })

  // eslint-disable-next-line
  useEffect(() => form.resetFields(), [initRow])

  const initialValues = {
    ...initRow,

  }

  function clearFormData() {
    form.resetFields()
    setInitRow(undefined)
    setOpenForm(false)
    refetch()
    setIdDes(undefined)
    setIdSrc(undefined)
    setItems([])
  }

  function handleSubmit() {
    form.validateFields()
      .then(input => {
        let { ...toUpdate } = { ...input, items, type } || {}
        transfer({ variables: { idShop: currentShop?._id, input: toUpdate } })
          .then(() => {
            message.success(`Cập nhật thành công`)
            clearFormData()
          }).catch(e => message.error(e.message))

      }).catch(() => message.error('Lỗi nhập liệu'))
  }

  function handleStocksChange(stocks) {
    const updated = stocks.map(idStock => {
      const existedItem = items?.find(i => i.idStock === idStock)
      return existedItem || { idStock, quantity: 1 }
    })
    setItems(updated)
  }

  function getMainStore() {
    const mainStore = type === 'IMPORT' ? idDes : idSrc
    const store = storeData?.stores.find(s => s._id === mainStore)
    return store || {}
  }

  const footDef = [
    {
      name: 'Lưu',
      type: 'primary',
      onClick: handleSubmit
    },

    {
      name: 'Hủy',
      onClick: clearFormData,
    }
  ]
  console.log(getMainStore())
  return (
    <Drawer
      title={typeName}
      onClose={clearFormData}
      visible={openForm}
      footDef={footDef}
    >
      <RForm form={form} initialValues={initialValues}>
        <RSelect
          label='Từ kho'
          name='idSrc'
          placeholder='Chọn kho...'
          disabled={type === 'IMPORT'}
          data={storeData?.stores}
          refetch={storeRefetch}
          labelRender={row => row.name}
          optionRender={row => row.name}
          optionValue={row => row._id}
          onChange={val => setIdSrc(val)}
        />

        <RSelect
          label='Đến kho'
          name='idDes'
          placeholder='Chọn kho...'
          disabled={type === 'EXPORT'}
          data={storeData?.stores}
          refetch={storeRefetch}
          labelRender={row => row.name}
          optionRender={row => row.name}
          optionValue={row => row._id}
          onChange={val => setIdDes(val)}
        />

        <RSelect
          label='Hàng hóa'
          mode='multiple'
          name='items'
          showSearch
          placeholder='Chọn hàng hóa...'
          data={stockData?.stocks}
          refetch={stockRefetch}
          disabled={!idDes && !idSrc}
          labelRender={row => `${row.product.name} (${row.name})`}
          optionRender={row => {
            const mainStore = getMainStore()
            const total = row.records.reduce((sum, record) => {
              const storeMatch = record.store._id === mainStore._id
              return storeMatch ? (sum + record.quantity) : sum
            }, 0)

            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Image style={{ width: 60 }} fromAws src={row.imgs[0]} />}
                  title={`${row.product.name} (${row.name})`}
                  description={
                    <>
                      <Tag>Kho: {mainStore.name}</Tag>
                      <Tag color='blue'>Tồn kho: {total}</Tag>
                    </>
                  }
                />
              </List.Item>
            )
          }}
          optionValue={row => row._id}
          filterProps={row => [row.product.name, row.name]}
          onChange={stocks => handleStocksChange(stocks)}
        />

        <TransferItems
          items={items}
          data={stockData?.stocks}
          setItems={setItems}
          type={type}
          mainStore={getMainStore()}
        />

        <RInput
          label='Ghi chú'
          name='note'
          textarea
        />
      </RForm>
    </Drawer>
  )
}
