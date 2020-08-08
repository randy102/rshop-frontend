import React, { useState, useEffect } from 'react'
import Item from './Item'
import { Button, Space, Input, Modal, Form, message } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'
import RForm from '../Form'
import RInput from '../Form/RInput'

function getData(data = [], parent) {
  return data.filter(d => d.idParent === parent)
}

function getInit(data = [], checkedId) {
  return { name: data.find(d => d._id === checkedId)?.name }
}

export default function Section({ data = [], parent, title, isFirst = false, isLast = false, onChange = () => { }, onSave = () => { }, onDelete = () => { } }) {
  const [form] = Form.useForm()
  const [openForm, setOpenForm] = useState(false)
  const [checkedId, setCheckedId] = useState()
  const [initRow, setInitRow] = useState()

  useEffect(() => form.resetFields(), [initRow])

  useEffect(() => setCheckedId(undefined),[parent])
  
  function onSubmit() {
    form.validateFields()
      .then(input => {
        if (initRow) {
          onSave(checkedId, input.name)
            .then(() => {
              setOpenForm(false)
              form.resetFields()
            })
        } else {
          onSave(undefined, input.name, parent)
            .then(() => {
              setOpenForm(false)
              form.resetFields()
            })
        }
      })
  }

  function handleDelete() {
    if (!checkedId) {
      message.error('Vui lòng chọn thể loại')
      return
    }
    onDelete(checkedId)
  }

  function handleUpdate() {
    if (!checkedId || (!isFirst && !parent)) {
      message.error('Vui lòng chọn thể loại')
      return
    }
    form.resetFields()
    setInitRow(getInit(data, checkedId))
    setOpenForm(true)
  }

  function handleCreate() {
    if (!isFirst && !parent) {
      message.error('Vui lòng chọn thể loại')
      return
    }
    form.resetFields()
    setInitRow(undefined)
    setOpenForm(true)
  }

  return (
    <>
      <div className='section'>
        <div className='header'>{title}</div>
        <div className='items-wrap'>
          {getData(data, parent).map(item => (
            <Item
              checked={item._id === checkedId}
              name={item.name}
              key={item._id}
              onChange={() => {
                onChange(item._id)
                setCheckedId(item._id)
              }}
            />
          ))}

        </div>
        <div className='footer'>
          <Space align='center' size={20}>
            <Button onClick={handleCreate} icon={<PlusOutlined />} title='Thêm' />
            <Button onClick={handleUpdate} icon={<EditOutlined />} tittle='Sửa' />
            <Button onClick={handleDelete} icon={<DeleteOutlined />} title='Xóa' />
          </Space>
        </div>
      </div>

      {!isLast && <div className='arrow'><RightOutlined /></div>}

      <Modal
        visible={openForm}
        footer={false}
        onCancel={() => setOpenForm(false)}
      >
        <RForm onEnter={onSubmit} form={form} initialValues={initRow} style={{ width: 300, margin: '0 auto' }}>
          <RInput
            label='Tên thể loại'
            name='name'
            rules={{ required: true }}
            autoFocus
          />
          <Button onClick={onSubmit} type='primary' block style={{ marginTop: '-20px' }}>Lưu</Button>
        </RForm>


      </Modal>
    </>
  )
}
