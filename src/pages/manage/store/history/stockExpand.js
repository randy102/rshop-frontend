import React from 'react'
import Grid from 'components/admin/Grid'

import { Tag } from 'antd'


export default function StockExpand({data}) {

  return (
    <div>
      <Grid
        data={data}
        showSelection={false}
        colDef={[
          {
            title:'Tên hàng',
            dataIndex: 'stock',
            key: 'stock',
            render: stock => `${stock.product.name} (${stock.name})`
          },
          {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: quantity => <Tag color='blue'>{quantity}</Tag>
          }
        ]}
      />
    </div>
  )
}
