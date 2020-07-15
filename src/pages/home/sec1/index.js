import React from 'react'
import coverImg from './section1.jpg'
import './section1.scss'
import { Link } from 'react-router-dom'


export default function Section1() {
  function handleScroll(e){
    console.log(e)
  }

  return (
    <div  className="rui-home-sec1">
      <img src={coverImg} className="cover"/>
      <div onScrollCapture={handleScroll} className="intro">
        Tạo website bán hàng nhanh chóng, <br/> đơn giản
        <Link to="/login">Thử ngay</Link>
      </div>
    </div>
  )
}
