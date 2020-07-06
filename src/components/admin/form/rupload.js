import React, { useState } from 'react'
import { Form, Upload, message, Button } from 'antd'
import ImgCrop from 'antd-img-crop'
import { LoadingOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import * as axios from 'axios'
import './rupload.scss'

const Axios = axios.default

export default function RUpload({ label, url, initId, viewUrl, onChange = () => { } }) {
  const [imageId, setImageId] = useState(initId)
  const [loading, setLoading] = useState()

  function handleChange(info) {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      setImageId(info.file.response)
      setLoading(false)
      onChange(info.file.response)
    }

  }

  function handleRemove() {
    Axios.delete(url, { data: { id: imageId } })
      .then(() => {
        message.success('Xóa thành công!')
        setImageId(undefined)
        onChange(undefined)
      })
      .catch(err => message.error(err.message))
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể tải file JPG/PNG');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Dung lượng ảnh phải nhỏ hơn 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Form.Item label={label}>
      {imageId && <Button
        style={{ marginBottom: 10 }}
        danger
        onClick={handleRemove}
        icon={<DeleteOutlined />}
      >
        Xóa ảnh
      </Button>}

      <ImgCrop shape='round' rotate>
        <Upload
          name={'file'}
          listType="picture-card"
          className="avatar-uploader"
          disabled={imageId}
          showUploadList={false}
          action={url}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageId ? <img src={`${viewUrl}/${imageId}`} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </ImgCrop>
    </Form.Item>
  )
}
