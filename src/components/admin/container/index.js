import React from 'react'
import './container.scss'
export default function Content({ children, style }) {
  return (
    <div className='rui-container'>
      <div className='rui-container-inner' style={style}>
        {children}
      </div>
    </div>
  )
}
