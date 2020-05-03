import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import IndexRoute from 'routes/index'
import 'antd/dist/antd.css';
import 'assets/scss/rui.main.scss'

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <IndexRoute />
      </Suspense>
    </BrowserRouter>
  )
}
