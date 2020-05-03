import React from 'react'

export default function Shop({ match }) {
  // console.log(match)
  return (
    <div>
      Shop {match.params.shopId}
    </div>
  )
}
