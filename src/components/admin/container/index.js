import React from 'react'
import './container.scss'
export default function Content({ children }) {
  return (
    <div className='rui-container'>
      <div className='rui-container-inner'>
        {children}
      </div>
    </div>
  )
}
