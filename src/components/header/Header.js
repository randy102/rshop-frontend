import React from 'react'
import Brand from './Brand'
import RightDropdown from './RightDropdown'

export default function Header({ brand, overlay }) {
  return (
    <header className="rui-header-wrapper">
      <Brand>
        {brand}
      </Brand>

      <RightDropdown overlay={overlay} />
    </header>
  )
}
