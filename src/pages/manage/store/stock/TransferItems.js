import React from 'react'
import { List, InputNumber, Tag } from 'antd'
import Image from 'components/commons/Image'

export default function TransferItems({ items = [], type, data, mainStore, setItems = () => { } }) {

  return (
    <div className='transfer-item-wrap'>
      {items.map(item => {
        const stock = data.find(s => s._id == item.idStock)
        const total = stock.records.reduce((sum, record) => {
          const storeMatch = record.store._id === mainStore._id
          return storeMatch ? (sum + record.quantity) : sum
        }, 0)

        return (
          <List.Item >
            <List.Item.Meta
              avatar={<Image style={{ width: 60 }} fromAws src={stock.imgs[0]} />}
              title={`${stock.product.name} (${stock.name})`}
              description={
                <>
                  <Tag>Kho: {mainStore.name}</Tag>
                  <Tag color='blue'>Tồn kho: {total}</Tag>
                </>
              }
            />
            <InputNumber
              min={1}
              max={type != 'IMPORT' ? total: Number.MAX_SAFE_INTEGER}
              value={item.quantity}
              onChange={val => {
                setItems(items.map(i => {
                  if (i.idStock === item.idStock)
                    return { ...i, quantity: val || 1 }
                  return i
                }))
                
              }}

            />
          </List.Item>
        )
      })}
    </div>
  )
}
