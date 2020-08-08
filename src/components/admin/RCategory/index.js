import React, { useState } from 'react'
import './rcategory.scss'
import Section from './Section'
import { message } from 'antd'

export default function RCategory({ data = [], refetch = () => { }, onCreate = () => { }, onUpdate = () => { }, onDelete = () => { } }) {
  const [first, setFirst] = useState()
  const [second, setSecond] = useState()

  console.log(data)

  function onSave(_id, name, idParent) {
    return new Promise(resolve => {
      if (_id) {
        onUpdate({ _id, name })
          .then(() => {
            message.success('Thành công')
            refetch()
          })
          .catch(e => message.error(e.message))
          .finally(() => resolve())
      } else {
        onCreate({ name, idParent }).then(() => {
          message.success('Thành công')
          refetch()
        })
          .catch(e => message.error(e.message))
          .finally(() => resolve())
      }
    })
  }

  return (
    <div className='rui-admin-category'>
      <Section
        onDelete={onDelete}
        onSave={onSave}
        onChange={id => { 
          setFirst(id)
          setSecond(undefined)
        }}
        data={data}
        isFirst
        parent={null}
        title='Cấp 1'
      />
      <Section
        onDelete={onDelete}
        onSave={onSave}
        onChange={id => setSecond(id)}
        data={data}
        parent={first}
        title='Cấp 2' />
      <Section
        onDelete={onDelete}
        onSave={onSave}
        data={data}
        parent={second}
        isLast
        title='Cấp 3' />
    </div>
  )
}
