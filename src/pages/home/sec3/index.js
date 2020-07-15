import React from 'react'
import desktop from './desktop.png'
import './section3.scss'
import { ShopOutlined, SkinOutlined, DesktopOutlined, LaptopOutlined, CoffeeOutlined } from '@ant-design/icons'
import demo1 from './demo1.jpg'

export default function Section3() {
  return (
    <div className="rui-home-sec3">
      <div className="display">
        <img src={desktop} />
        <div className="overlay">
          <img src={demo1}/>
        </div>
      </div>

      <div className="categories">
        <div className="title">
          Đáp ứng nhu cầu bán hàng với nhiều thể loại sản phẩm
        </div>

        <div className="cate-wrap">
          <div className="item">
            <SkinOutlined />
            <div className="name">Quần áo</div>
          </div>

          <div className="item">
            <LaptopOutlined />
            <div className="name">Thiết bị điện tử</div>
          </div>

          <div className="item">
            <CoffeeOutlined />
            <div className="name">Ăn uống</div>
          </div>

          <div className="item">
            <ShopOutlined />
            <div className="name">Tạp hóa</div>
          </div>
        </div>
      </div>
    </div>
  )
}
