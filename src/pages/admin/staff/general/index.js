import React, { useState } from 'react'
import Grid from 'components/admin/grid'
import Drawer from 'components/admin/drawer'
import RForm from 'components/admin/form'
import { Form } from 'antd'
import RInput from 'components/admin/form/rinput'



const colDef = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
]

const data = [
  {
    _id: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    _id: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
]



export default function General() {
  const [openForm, setOpenForm] = useState(false)
  const [form] = Form.useForm()

  const headDef = [
    {
      icon: 'PlusOutlined',
      name: 'Thêm',
      onClick: (rows) => setOpenForm(true),
    },
    {
      icon: 'PlusOutlined',
      name: 'Thêmd',
      onClick: (rows) => setOpenForm(true),
    }
  ]

  const footDef = [
    {
      name: 'Lưu',
      onClick: () => {
        form.validateFields()
          .then(values => console.log(values))
          .catch(err => console.log(err))
      },
      type: 'danger'
    },
    {
      name: 'Hủy',
      onClick: () => setOpenForm(false),
    }
  ]

  return (
    <div>
      <Grid
        data={data}
        colDef={colDef}
        headDef={headDef}
      />

      <Drawer
        footDef={footDef}
        title='Quản trị viên mới'
        onClose={() => setOpenForm(false)}
        visible={openForm}
      >
        <RForm form={form} >
          <RInput
            label='test'
            placeholder='Nhập...'
            name='test'
            rules={{
              type: 'email'
            }}
          />
        </RForm>
      </Drawer>
    </div>
  )
}
