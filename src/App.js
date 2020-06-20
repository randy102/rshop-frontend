import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import IndexRoute from 'routes/index'
import 'antd/dist/antd.css';
import Loader from 'components/admin/loader';


export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader/>}>
        <IndexRoute />
      </Suspense>
    </BrowserRouter>
  )
}
