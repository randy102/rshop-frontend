import React, { useState, useEffect } from 'react'
import './create.scss'
import RForm from 'components/admin/form'
import RInput from 'components/admin/form/rinput'
import RUpload from 'components/admin/form/rupload'
import RSelect from 'components/admin/form/rselect'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_TEMPLATES, CREATE_SHOP } from './queries'
import { Button, Spin, Form, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export default function Create() {
  const { data: dataTemplates, refetch: refetchTemplate } = useQuery(GET_TEMPLATES)
  const [createShop] = useMutation(CREATE_SHOP)

  const [demoImg, setDemoImg] = useState()
  const [demoLoading, setDemoLoading] = useState(true)
  const [brandImg, setBrandImg] = useState()
  const [form] = Form.useForm()

  useEffect(() => {
    setDemoLoading(true)
  }, [demoImg])

  function handleCreate(){
    form.validateFields().then((input) => {
      const toCreate = {...input, brandImg}
      createShop({variables: {input: toCreate}})
        .then(res => {
          message.success('Tạo thành công!')
        }).catch(e => message.error(e.message))
    })
  }

  return (
    <div className="rui-manage-create-shop">
      <RForm form={form}>
        <RInput
          label='Tên cửa hàng'
          placeholder='Nhập tên cửa hàng. VD: Thế giới di động'
          name='name'
          rules={{ required: true }}
        />

        <RInput
          label='Tên miền'
          name='domain'
          placeholder='Không chứa ký tự đặc biệt, số hoặc khoảng trống. VD: tgdd'
          rules={{ required: true, pattern: /^[a-zA-Z]+$/ }}
        />

        <RUpload
          crop={false}
          label="Ảnh thương hiệu"
          onChange={setBrandImg}
        />

        <RSelect
          data={dataTemplates && dataTemplates.activeTemplates}
          label="Chủ đề"
          name="idTemplate"
          required
          refetch={refetchTemplate}
          optionRender={r => r.name}
          optionValue={r => r._id}
          showSearch={false}
          onChange={val => setDemoImg(dataTemplates.activeTemplates.find(r => r._id === val).demoImg)}
        />

        <div className="template-demo">
          {demoLoading && demoImg && <Spin/>}
          <img style={{display: demoImg ? 'block' : 'none'}} onLoad={() => setDemoLoading(false)} src={`${process.env.REACT_APP_S3URL}/${demoImg}`} />
        </div>

        <Button onClick={handleCreate} type='primary' block icon={<PlusOutlined/>}>Tạo</Button>
      </RForm>
    </div>
  )
}
