import React, { useState } from 'react'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { DELETE_CATEGORY, GET_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY } from './queries'
import { message, Modal } from 'antd'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'
import RCategory from 'components/admin/RCategory'

export default function Category() {
  const [currentShop] = useRecoilState(CURRENT_SHOP)


  const { data, refetch } = useQuery(GET_CATEGORIES, { variables: { idShop: currentShop?._id } })
  const [create] = useMutation(CREATE_CATEGORY)
  const [update] = useMutation(UPDATE_CATEGORY)
  const [deleteRow] = useMutation(DELETE_CATEGORY)

  function onCreate(input) {
    return create({ variables: { idShop: currentShop?._id, input } })
  }

  function onUpdate(input) {
    return update({ variables: { idShop: currentShop?._id, input } })
  }

  function onDelete(id) {
    Modal.confirm({
      title: 'Bạn có chắc muốn xóa thể loại này?',
      onOk: () => {
        deleteRow({ variables: { idShop: currentShop?._id, id } })
          .then(() => {
            message.success('Xóa thành công')
            refetch()
          }).catch(e => message.error(e.message))
      }
    })
  }

  return (
    <RCategory
      data={data?.categories}
      refetch={refetch}
      onCreate={onCreate}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  )
}
