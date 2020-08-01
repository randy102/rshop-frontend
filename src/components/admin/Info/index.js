import React from 'react'
import './info.scss'

function Info({children}) {
  return (
    <div className="rui-info-wrap">
      {children}
    </div>
  )
}

Info.Item = function Item({title, content}){
  return (
    <>
      <div className="rui-info-title">{title}</div>
      <div className="rui-info-content">{content}</div>
    </>
  )
}

export default Info