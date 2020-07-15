import React from 'react'
import './section4.scss'
import { useQuery } from '@apollo/react-hooks'
import { GET_ACTIVE_PLANS } from './queries'
import { currencyFormatter } from 'utils/string'
import { Link } from 'react-router-dom'

export default function Section4() {
  const { data } = useQuery(GET_ACTIVE_PLANS)

  return (
    <div className="rui-home-sec4">
      <div className="title">
        Đăng ký để trải nghiệm ngay!
      </div>
      <div className="plans">
        {data && data.publishedPlans.map(plan => (
          <div className="item">
            <Link to="/login">
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
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
