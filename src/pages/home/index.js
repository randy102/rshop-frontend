import React from 'react'
import Header from './header'
import Section1 from './sec1'
import Section2 from './sec2'
import Section3 from './sec3'
import Section4 from './sec4'

document.title = 'RShop | Tạo website bán hàng trong 30 giây'

export default function Home() {
  return (
    <div>
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  )
}
