import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import IndexRoute from 'routes/index'
import 'assets/css/rui.main.css'

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <IndexRoute />
      </Suspense>
    </BrowserRouter>
  )
}
