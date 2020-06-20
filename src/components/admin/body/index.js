import React from 'react'
import { Row, Col } from 'antd'
import Subbar from '../subbar'
import Router from '../router'
import './body.scss'
/**
 * 
 * @param title Page's title
 * @param routes Array of route config
 * @param components Objecct of components 
 */
export default function Body({title, routes, components}) {
  return (
    <Row>
      <Col span={6}>
        <Subbar title={title} routes={routes}/>
      </Col>
      <Col span={18}>
        <div className='rui-body'>
          <Router components={components} routes={routes}/>
        </div>
      </Col>
    </Row>
  )
}
