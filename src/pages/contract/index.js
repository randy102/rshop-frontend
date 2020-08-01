import React from 'react'
import './contract.scss'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_ACTIVE_PLANS } from 'pages/home/sec4/queries'
import { currencyFormatter } from 'utils/string'
import { SIGN_CONTRACT } from './queries'
import { Modal, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { client } from 'configs/apollo'
import { GET_ACTIVE_CONTRACT } from 'pages/manage/queries'

document.title = 'Đăng ký hợp đồng'
export default function Contract() {
  const { data } = useQuery(GET_ACTIVE_PLANS)
  const [signContract] = useMutation(SIGN_CONTRACT)
  const history = useHistory()

  function handleSign(idPlan) {
    Modal.confirm({
      title: "Bạn có chắc muốn đăng ký gói này?",
      onOk: () => {
        signContract({ variables: { input: { idPlan } } })
          .then((res) => {
            client.writeQuery({
              query: GET_ACTIVE_CONTRACT,
              data: res.data.signContract
            })
            setTimeout(() => {
              Modal.info({
                title: 'Đăng ký thành công!',
                okText: 'Về trang quản lý',
                onOk: ()=>{
                  history.push('/0/manage')
                }
              })
            })
          })
          .catch(e => message.error(e.message))
      }
    })
  }

  return (
    <div className="rui-contract-wrap">
      <div className="title">
        Vui lòng đăng ký gói sử dụng để tiếp tục
      </div>
      <div className="plans">
        {data && data.publishedPlans.map(plan => (
          <div className="item" onClick={() => handleSign(plan._id)}>

            <div className="name">
              {plan.name}
            </div>

            <div className="des">
              {plan.description}
            </div>

            <div className="dur">
              {plan.duration} ngày
            </div>

            <div className="price">
              {currencyFormatter(plan.price)} đ
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
