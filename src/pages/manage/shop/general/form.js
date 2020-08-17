import React, { useEffect, useState } from 'react'
import Drawer from 'components/admin/Drawer'
import RForm from 'components/admin/Form'
import RInput from 'components/admin/Form/RInput'
import { Form as AntForm, message } from 'antd'
import { useMutation, useQuery } from '@apollo/react-hooks'
import RUpload from 'components/admin/Form/RUpload'
import { UPDATE_SHOP } from './queries'
import { GET_TEMPLATES } from '../create/queries'
import RRadio from 'components/admin/Form/RRadio'
import RSwitch from 'components/admin/Form/RSwitch'
import { useHistory } from 'react-router-dom'
import { client } from 'configs/apollo'
import { USER_SHOPS } from 'recoil/atoms/userShops'
import { useRecoilState } from 'recoil'
import { GET_USER_SHOPS } from 'pages/manage/queries'

export default function Form({ openForm, setOpenForm, initRow, refetch }) {
  const [form] = AntForm.useForm()
  const [updateShop] = useMutation(UPDATE_SHOP)
  const { data: dataTemplates } = useQuery(GET_TEMPLATES)
  const history = useHistory()
  const [brandImg, setBrandImg] = useState()
  const [userShops] = useRecoilState(USER_SHOPS)

  const initialValues = initRow && {
    ...initRow,
    idTemplate: initRow.template._id
  }

  // eslint-disable-next-line
  useEffect(() => {
    form.resetFields()
    setBrandImg(initRow?.brandImg)
  }, [initRow])

  function clearFormData() {
    form.resetFields()
    setOpenForm(false)
    refetch()
  }

  function handleSubmit(brandImg, refresh = false) {
    form.validateFields()
      .then(input => {
        const toUpdate = {
          _id: initRow?._id,
          ...input,
          brandImg: brandImg || '',
        }
        updateShop({ variables: { input: toUpdate } })
          .then((res) => {
            message.success(`Cập nhật thành công`)

            client.writeQuery({
              query: GET_USER_SHOPS,
              data: {
                userShops: userShops.map(shop => {
                  if (shop._id === res.data.updateShop._id) {
                    return res.data.updateShop
                  }
                  return shop
                })
              }
            })
            if(refresh)
              setTimeout(() => {
                history.push(`/${res.data.updateShop.domain}/manage/shop`)
              })
          }).catch(e => message.error(e.message))
      }).catch(err => message.error(err.message))
  }

  return (
    <Drawer
      footDef={[
        {
          name: 'Lưu',
          type: 'primary',
          onClick: () => handleSubmit(brandImg, true)
        },
        {
          name: 'Hủy',
          onClick: clearFormData,
        }
      ]}
      title='Cửa hàng'
      onClose={clearFormData}
      visible={openForm}
    >
      <RForm form={form} initialValues={initialValues}>
        <RInput
          label='Tên cửa hàng'
          placeholder='Nhập tên cửa hàng. VD: Thế giới di động'
          name='name'
          rules={{ required: true }}
        />

        <RInput
          label='Tên miền'
          suffix={`.${process.env.REACT_APP_DOMAIN}`}
          name='domain'
          placeholder='Nhập tên miền. VD: tgdd'
          rules={{ required: true, pattern: /^[a-zA-Z]+$/ }}
        />

        <RSwitch
          label='Trạng thái'
          checkedText='Đang hoạt động'
          unCheckedText='Dừng hoạt động'
          name='isActive'
        />

        <RUpload
          crop={false}
          label="Ảnh thương hiệu"
          onChange={(id)=>{
            setBrandImg(id)
            handleSubmit(id)
          }}
          initId={brandImg}
        />


        <RRadio
          style={{marginLeft: 10}}
          data={dataTemplates && dataTemplates.activeTemplates}
          label="Chủ đề"
          name="idTemplate"
          required
          optionRender={r => (
            <RRadio.ImageItem style={{width: '150px'}}>
              <RRadio.ImageItem.Title className="radio-name">{r.name}</RRadio.ImageItem.Title>
              <img src={`${process.env.REACT_APP_S3URL}/${r.demoImg}`} />
            </RRadio.ImageItem>
          )}
          optionValue={r => r._id}
        />
      </RForm>
    </Drawer>
  )
}
