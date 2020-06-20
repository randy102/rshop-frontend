import React from 'react'

export default function Title({name}) {
  if(name) return (
    <div className="rui-subbar-title">
      {name}
    </div>
  )
}
