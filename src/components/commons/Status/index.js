import React from 'react'
import './status.scss'

export default function Status({ type = 'active', content='' }) {
  return (
    <div>
      <div className={`rui-status ${type}`}></div> {content}
    </div>
  )
}
