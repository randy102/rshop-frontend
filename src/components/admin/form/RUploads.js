import React, { useState, useEffect } from 'react'
import { Form, Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import * as axios from 'axios'
import './ruploads.scss'
import Modal from 'antd/lib/modal/Modal';

const Axios = axios.default

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default function RUpload({ disabled = false, uploadApi = () => { }, label, url = process.env.REACT_APP_PHOTO_API, initIds, viewUrl = process.env.REACT_APP_S3URL, onChange = () => { } }) {
  const [fileList, setFileList] = useState()
  const [showModal, setShowModal] = useState(false)
  const [previewImage, setPreviewImage] = useState()

  useEffect(() => {
    setFileList(initIds?.map(id => ({
      uid: id,
      url: `${viewUrl}/${id}`,
      status: 'done',
      name: id,
      response: id,
      type: 'image/*'
    })))
  }, [initIds])

  useEffect(() => {
    uploadApi({
      reset() {
        setFileList(undefined)
      },
      removeAll(){
        for(let file of fileList){
          handleRemove(file)
        }
        setFileList(undefined)
      }
    })
  }, [fileList])

  function handleChange({ fileList }) {
    const filterList = fileList.filter(file => file.type.includes('image'))
    setFileList(filterList)
    onChange(filterList.map(file => file.response))
  }

  function handleRemove(file) {
    Axios.delete(url, { data: { id: file.response } })
      .then(() => {
        message.success('Xóa thành công!')
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

  async function handlePreview(file) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview)
    setShowModal(true)
  }

  return (
    <Form.Item label={label}>

      <Upload
        disabled={disabled}
        multiple
        accept='image/*'
        name={'file'}
        listType="picture-card"
        className="list-uploader"
        action={url}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onRemove={handleRemove}
        onPreview={handlePreview}
        fileList={fileList}
      >
        <div>
          <PlusOutlined />
          <div className="ant-upload-text">Upload</div>
        </div>
      </Upload>
      <Modal
        visible={showModal}
        footer={null}
        onCancel={() => setShowModal(false)}
      >
        <img alt="img" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Form.Item>
  )
}
