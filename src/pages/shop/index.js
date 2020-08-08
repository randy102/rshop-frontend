import React from 'react'

export default function Shop({ match }) {
  
  return (
    <div>
      Shop {match.params.shopId}
    </div>
  )
}
