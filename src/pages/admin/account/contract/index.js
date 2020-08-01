import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_ACTIVE_CONTRACT } from './queries'
import './contract.scss'
import Info from 'components/admin/Info'
import { Moment } from 'utils/moment'

export default function Contract() {
  const { data } = useQuery(GET_ACTIVE_CONTRACT)

  return (
    <div className="rui-user-contract">
      <div className="header">Thông tin hợp đồng</div>
      <Info>
        <Info.Item
          title="Mã hợp đồng"
          content={data?.activeContract._id}
        />

        <Info.Item
          title="Gói đăng ký"
          content={data?.activeContract.plan.name}
        />

        <Info.Item
          title="Thời hạn sử dụng"
          content={`${data?.activeContract.plan.duration} ngày`}
        />

        <Info.Item
          title="Ngày kích hoạt"
          content={Moment(data?.activeContract.signDate).format('D/M/YYYY')}
        />

        <Info.Item
          title="Thời hạn còn lại"
          content={Moment(data?.activeContract.expDate).diff(Moment(), 'day') + ' ngày'}
        />
      </Info>
    </div>
  )
}
