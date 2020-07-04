import React, { useEffect } from 'react'
import Drawer from 'components/admin/drawer'
import RForm from 'components/admin/form'
import RInput from 'components/admin/form/rinput'
import { Form as AntForm, message } from 'antd'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { CREATE_CONTRACT, PUBLISHED_PLANS } from './queries'
import RSelect from 'components/admin/form/rselect'
import { GET_USERS } from 'pages/admin/user/general/queries'
import { currencyFormatter } from 'utils/string'


export default function Form({ openForm, setOpenForm, initRow, setInitRow, refetch }) {
  var [form] = AntForm.useForm()
  var { data: planData, refetch: planRefetch } = useQuery(PUBLISHED_PLANS)
  var { data: userData, refetch: userRefetch } = useQuery(GET_USERS)
  var [create] = useMutation(CREATE_CONTRACT)

  // eslint-disable-next-line
  useEffect(() => form.resetFields(), [initRow])

  function clearFormData() {
    form.resetFields()
    setInitRow(undefined)
    setOpenForm(false)
    refetch()
  }

  var footDef = [
    {
      name: 'Lưu',
      type: 'danger',
      onClick: () => {
        form.validateFields()
          .then(input => {
            // If create
            if (!initRow) {
              create({ variables: { input } })
                .then(res => {
                  message.success(`Tạo thành công`)
                  clearFormData()
                }).catch(e => message.error(e.message))
            }
          })
      }
    },

    {
      name: 'Hủy',
      onClick: clearFormData,
    }
  ]

  return (
    <Drawer
      footDef={footDef}
      title={initRow ? initRow.name : 'Hợp đồng mới'}
      onClose={clearFormData}
      visible={openForm}
    >
      <RForm form={form}>


        <RSelect
          data={planData?.publishedPlans}
          name='idPlan'
          label='Gói sử dụng'
          showSearch
          required
          refetch={planRefetch}
          filterProps={(row) => [row.name]}
          optionValue={row => row._id}
          optionRender={row => (
            <div>
              <b>{row.name}</b><br></br>
              {currencyFormatter(row.price)} đ<br></br>
              {row.duration} ngày
            </div>
          )}
        />

        <RSelect
          data={userData?.users}
          name='idUser'
          label='Người dùng'
          showSearch
          required
          refetch={userRefetch}
          filterProps={(row) => [row.profile.fullName, row.credential.email]}
          optionValue={row => row._id}
          optionRender={row => (
            <div>
              <b>{row.profile.fullName}</b><br></br>
              {row.credential.email} 
            </div>
          )}
        />

      </RForm>
    </Drawer>
  )
}