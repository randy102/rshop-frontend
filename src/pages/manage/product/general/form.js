import React, { useEffect, useState, useRef } from 'react'
import Drawer from 'components/admin/Drawer'
import RForm from 'components/admin/Form'

import { Form as AntForm, message, Timeline, Button, Divider, Breadcrumb } from 'antd'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { UPDATE_PRODUCT, CREATE_PRODUCT, GET_CATEGORIES, GET_BRANDS } from './queries'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'
import RInput from 'components/admin/Form/RInput'
import Stock from './stockIndex'
import RSelect from 'components/admin/Form/RSelect'
import { RightOutlined } from '@ant-design/icons'
import RSwitch from 'components/admin/Form/RSwitch'

const CONFIG = {
  FORM_NAME: 'Mặt hàng mới'
}

export default function Form({ openForm, setOpenForm, initRow, setInitRow, refetch }) {
  const [currentShop] = useRecoilState(CURRENT_SHOP)

  const [idProduct, setIdProduct] = useState()
  const [submitLoading, setSubmitLoading] = useState(false)
  const bottomRef = useRef()

  const [form] = AntForm.useForm()
  const [create] = useMutation(CREATE_PRODUCT)
  const [update] = useMutation(UPDATE_PRODUCT)
  const { data: dataCategory, refetch: refetchCategory } = useQuery(GET_CATEGORIES, { variables: { idShop: currentShop?._id } })
  const { data: dataBrand, refetch: refetchBrand } = useQuery(GET_BRANDS, { variables: { idShop: currentShop?._id } })


  // eslint-disable-next-line
  useEffect(() => form.resetFields(), [initRow])

  useEffect(() => setIdProduct(initRow?._id), [initRow])

  const initialValues = {
    ...initRow,
    idCategory: initRow?.category._id,
    idBrand: initRow?.brand._id
  }

  function clearFormData() {
    form.resetFields()
    setInitRow(undefined)
    setOpenForm(false)
    refetch()
    setSubmitLoading(false)
    setIdProduct(undefined)
  }

  function handleSubmit() {
    form.validateFields()
      .then(input => {
        console.log(idProduct, input)
        // If create
        if (!initRow && !idProduct) {
          setSubmitLoading(true)
          create({ variables: { idShop: currentShop?._id, input } })
            .then(res => {
              message.success(`Tạo thành công. Hiện tại bạn có thể thêm phân loại hàng`)
              setIdProduct(res.data.createProduct._id)
              setSubmitLoading(false)
              bottomRef.current.scrollIntoView({ behavior: "smooth" })
            }).catch(e => message.error(e.message))
        }

        // If update
        else {
          setSubmitLoading(true)
          let { ...toUpdate } = { ...input, _id: initRow?._id || idProduct } || {}
          update({ variables: { idShop: currentShop?._id, input: toUpdate } })
            .then(() => {
              message.success(`Cập nhật thành công`)
              setSubmitLoading(false)
            }).catch(e => message.error(e.message))
        }
      }).catch(() => message.error('Lỗi nhập liệu'))
  }

  const footDef = [
    {
      name: 'Hủy',
      onClick: clearFormData,
    }
  ]

  return (
    <Drawer
      title={initRow ? initRow.name : CONFIG.FORM_NAME}
      onClose={clearFormData}
      visible={openForm}
      footDef={footDef}
    >

      <RForm form={form} initialValues={initialValues}>
        <RInput
          label='Tên mặt hàng'
          name='name'
          rules={{ required: true }}
        />

        <RSelect
          label='Thể loại'
          name='idCategory'
          required
          refetch={refetchCategory}
          data={dataCategory?.categories}
          filterProps={row => [row.name]}
          showSearch
          optionValue={row => row._id}
          optionRender={row => (
            <Breadcrumb separator={<RightOutlined />}>
              {row.parent?.parent && <Breadcrumb.Item>{row.parent?.parent?.name}</Breadcrumb.Item>}
              {row.parent && <Breadcrumb.Item>{row.parent?.name}</Breadcrumb.Item>}
              <Breadcrumb.Item >{row.name}</Breadcrumb.Item>
            </Breadcrumb>
          )}
          labelRender={row => (
            <div>
              {row.parent?.parent && row.parent?.parent?.name + ' > '}
              {row.parent && row.parent?.name + ' > '}
              {row.name}
            </div>
          )}
        />

        <RSelect
          label='Thương hiệu'
          name='idBrand'
          required
          refetch={refetchBrand}
          data={dataBrand?.brands}
          optionValue={row => row._id}
          optionRender={row => row.name}
          showSearch
          filterProps={row => [row.name]}
          labelRender={row => row.name}
        />

        <RSwitch
          label='Trạng thái'
          name='isActive'
          checkedText='Hiển thị'
          unCheckedText='Ẩn'
          defaultChecked={false}
        />

        <RInput
          label='Mô tả'
          name='description'
          textarea
        />

        <Button
          type='primary'
          onClick={handleSubmit}
          loading={submitLoading}
        >
          {idProduct ? 'Lưu' : 'Tiếp theo'}
        </Button>
      </RForm>

      <Divider
        orientation='left'
        style={{ marginTop: '40px', fontWeight: 'bold' }}
      >
        Phân loại hàng
      </Divider>

      <Stock idProduct={idProduct} />

      <div style={{ float: "left", clear: "both" }}
        ref={bottomRef}>
      </div>
    </Drawer>
  )
}
