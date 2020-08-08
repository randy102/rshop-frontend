import React from 'react'

export default function Image({src,alt='',style,fromAws=false}) {
  const imgProps = {
    src: fromAws ? `${process.env.REACT_APP_S3URL}/${src}` : src,
    alt,
    style
  }
  return <img {...imgProps}/>
}
