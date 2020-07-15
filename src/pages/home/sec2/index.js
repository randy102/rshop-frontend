import React from 'react'
import { Col, Row } from 'antd'
import { RocketOutlined, CheckCircleOutlined, BarChartOutlined } from '@ant-design/icons'
import './section2.scss'

export default function Section2() {
  return (
    <div className="rui-home-sec2">
      <Row gutter={16}>
        <Col span={8}>
          <div className="item-wrap">
            <div className="icon">
              <RocketOutlined />
            </div>
            <div className="content">
              Tạo website bán hàng chuyên nghiệp chỉ trong 30 giây
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="item-wrap">
            <div className="icon">
              <CheckCircleOutlined />
            </div>
            <div className="content">
              Thao tác đơn giản, dễ sử dụng
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="item-wrap">
            <div className="icon">
            <BarChartOutlined />
            </div>
            <div className="content">
              Quản lý, thống kê doanh số, nhập kho, nhân viên...
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
