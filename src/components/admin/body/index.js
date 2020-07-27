import React from 'react'
import { Row, Col } from 'antd'
import Subbar from '../SubBar'
import Router from '../Router'
import './body.scss'
/**
 * 
 * @param title Page's title
 * @param routes Array of route config
 * @param components Objecct of components 
 */
export default function Body({ title, routes, components }) {
  return (
    <div className="rui-body-wrap">
      <div className="rui-body-left">
        <Subbar title={title} routes={routes} />
      </div>

      <div className='rui-body-right'>
        <Router components={components} routes={routes} />
      </div>
     
    </div>
  )
}
