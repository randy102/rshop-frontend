import React, { useState } from 'react'
import { Row, Col, List, Spin } from 'antd'
import './profile.scss'

export default function UserProfile({ data, avatar }) {
  var [imgLoading, setImgLoading] = useState(true)
  
  return (
    <Row gutter={16}>
      <Col sm={24} >
        <div class="rui-profile-avatar">
          {imgLoading && <Spin/>}
          <img style={{display: imgLoading?'none':'block'}} onLoad={() => setImgLoading(false)} alt="avatar" src={avatar} />
        </div>
      </Col>
      <Col sm={24}>
        <List
          size='large'
          dataSource={data}
          renderItem={item => (
            <List.Item style={{ textAlign: 'center' }}>
              <b>{item.title}</b> <br />{item.content}
            </List.Item>
          )}
        />
      </Col>
    </Row>
  )
}
