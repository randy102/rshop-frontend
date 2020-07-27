import React, { useEffect, useState } from 'react'
import Drawer from 'components/admin/Drawer'
import RForm from 'components/admin/Form'
import RInput from 'components/admin/Form/RInput'
import { Form as AntForm } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import RUpload from 'components/admin/Form/RUpload'
import { GET_TEMPLATES } from 'pages/manage/shop/create/queries'
import RRadio from 'components/admin/Form/RRadio'
import RSwitch from 'components/admin/Form/RSwitch'


export default function Form({ openForm, setOpenForm, initRow }) {
  const [form] = AntForm.useForm()
  const { data: dataTemplates } = useQuery(GET_TEMPLATES)
  const [brandImg, setBrandImg] = useState()
  

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
  }

  return (
    <Drawer
      footDef={[
        {
          name: 'Đóng',
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
          name='name'
          disabled={true}
        />

        <RInput
          label='Tên miền'
          suffix={`.${process.env.REACT_APP_DOMAIN}`}
          name='domain'
          disabled={true}
        />

        <RSwitch
          label='Trạng thái'
          checkedText='Đang hoạt động'
          unCheckedText='Dừng hoạt động'
          name='isActive'
          disabled={true}
        />

        <RUpload
          crop={false}
          label="Ảnh thương hiệu"
          initId={brandImg}
          disabled={true}
        />


        <RRadio
          data={dataTemplates && dataTemplates.activeTemplates}
          label="Chủ đề"
          name="idTemplate"
          required
          optionRender={r => (
            <RRadio.ImageItem style={{width: 150}}>
              <RRadio.ImageItem.Title className="radio-name">{r.name}</RRadio.ImageItem.Title>
              <img src={`${process.env.REACT_APP_S3URL}/${r.demoImg}`} />
            </RRadio.ImageItem>
          )}
          optionValue={r => r._id}
          disabled={true}
        />
      </RForm>
    </Drawer>
  )
}
