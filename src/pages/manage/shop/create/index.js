import React, { useState, useEffect } from 'react'
import './create.scss'
import RForm from 'components/admin/Form'
import RInput from 'components/admin/Form/RInput'
import RUpload from 'components/admin/Form/RUpload'
import RSelect from 'components/admin/Form/RSelect'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_TEMPLATES, CREATE_SHOP } from './queries'
import { Button, Spin, Form, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useSetRecoilState, useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'
import { USER_SHOPS } from 'recoil/atoms/userShops'
import { client } from 'configs/apollo'
import { GET_USER_SHOPS } from 'pages/manage/queries'
import RRadio from 'components/admin/Form/RRadio'

export default function Create() {
  const { data: dataTemplates } = useQuery(GET_TEMPLATES)
  const [createShop] = useMutation(CREATE_SHOP)
  const history = useHistory()

  const [brandImg, setBrandImg] = useState()
  const [form] = Form.useForm()
  const [userShops] = useRecoilState(USER_SHOPS)

  function handleCreate() {
    form.validateFields().then((input) => {
      const toCreate = { ...input, brandImg }
      createShop({ variables: { input: toCreate } })
        .then(res => {
          client.writeQuery({
            query: GET_USER_SHOPS,
            data: {
              userShops: [...userShops, res.data.createShop]
            }
          })
          const close = message.loading('Đang tải', 0)
          setTimeout(() => {
            close()
            history.push(`/${res.data.createShop.domain}/manage`)
          })

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
          suffix={`.${process.env.REACT_APP_DOMAIN}`}
          name='domain'
          placeholder='Nhập tên miền. VD: tgdd'
          rules={{ required: true, pattern: /^[a-zA-Z]+$/ }}
        />

        <RUpload
          crop={false}
          label="Ảnh thương hiệu"
          onChange={setBrandImg}
          initId={brandImg}
        />


        <RRadio
          data={dataTemplates && dataTemplates.activeTemplates}
          label="Chủ đề"
          name="idTemplate"
          required
          optionRender={r => (
            <div className="template-radio-item">
              <div className="radio-name">{r.name}</div>
              <img src={`${process.env.REACT_APP_S3URL}/${r.demoImg}`} />
            </div>
          )}
          optionValue={r => r._id}
        />

        <Button onClick={handleCreate} type='primary' block icon={<PlusOutlined />}>Tạo</Button>
      </RForm>
    </div>
  )
}
