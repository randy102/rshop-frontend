import React, { useState } from 'react'
import { Row, Col, List, Spin } from 'antd'
import './profile.scss'

export default function UserProfile({ data, avatar }) {
  const [imgLoading, setImgLoading] = useState(true)
  
  return (
    <Row gutter={16} className="rui-profile-wrap">
      <Col sm={24} lg={12} style={{display:'flex'}}>
        <div class="rui-profile-avatar">
          {imgLoading && <Spin/>}
          <img style={{display: imgLoading?'none':'block'}} onLoad={() => setImgLoading(false)} alt="avatar" src={avatar} />
        </div>
      </Col>
      <Col sm={24} lg={12}>
        <List
          className="rui-profile-info"
          split={false}
          size='large'
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <b>{item.title}</b> <br />{item.content}
            </List.Item>
          )}
        />
      </Col>
    </Row>
  )
}
