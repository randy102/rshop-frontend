import React from 'react'
import Grid from 'components/admin/grid'

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

const headDef = [
  {
    icon: 'PlusOutlined',
    name: 'Thêm',
    onClick: (rows) => console.log(rows),
    selection: 'multiple'
  }
]

export default function General() {
  return (
    <div>
      <Grid
        data={data}
        colDef={colDef}
        headDef={headDef}
      />
    </div>
  )
}
