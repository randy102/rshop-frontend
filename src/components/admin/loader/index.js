import React from 'react'
import { Skeleton } from 'antd'

export default function Loader() {
  return (
    <div style={{padding: '30px'}}>
      <Skeleton avatar paragraph={{rows: 2}}/>
      <Skeleton avatar/>
      <Skeleton avatar/>
      <Skeleton avatar/>
    </div>
  )
}
