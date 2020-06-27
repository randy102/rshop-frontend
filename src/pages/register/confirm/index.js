import React, { useState } from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import { Result, Button, message, Statistic } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { REQUEST_CONFIRM } from '../queries'
import { Jwt } from 'utils/jwt'

export default function RegisterConfirm() {
  let [sending, setSending] = useState(false)
  let [deadline, setDeadline] = useState(Date.now() + 1000 * 30)
  let [resendable, setResendable] = useState(false)

  let [requestConfirm] = useMutation(REQUEST_CONFIRM)
  let location = useLocation()
  let { email } = location.state || {}

  if(Jwt.isSet() || !email) return <Redirect to='/' />
  
  function resendEmail() {
    setSending(true)
    requestConfirm({ variables: { input: { email } } })
      .then(() => {
        setSending(false)
        message.success('Đã gửi thư. Vui lòng kiểm tra lại hộp thư')
        setDeadline(Date.now() + 1000 * 30)
        setResendable(false)
      })
      .catch(err => {
        setSending(false)
        message.error(err.message)
      })
  }

  return (
    <Result
      status='info'
      title='Xác nhận Email'
      subTitle={`Chúng tôi đã gửi một thư xác nhận đến <${email}>. Vui lòng kiểm tra hộp thư để xác thực tài khoản của bạn.`}
      extra={[
        <div>
          Vẫn chưa nhận được thư? Hãy thử tìm trong mục spam hoặc yêu cầu
          <Button
            disabled={!resendable}
            loading={sending}
            onClick={resendEmail}
            style={{ margin: '0 5px' }}>
            Gửi lại
          </Button>
          <Statistic.Countdown
            style={{ display: resendable ?  'none' : 'inline-flex', marginLeft: 5 }}
            format='s'
            suffix={'giây'}
            prefix={'sau'}
            value={deadline}
            onFinish={() => setResendable(true)}

          />
        </div>
      ]}
    />
  )
}
