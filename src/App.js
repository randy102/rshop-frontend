import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import IndexRoute from 'routes/index'
import 'antd/dist/antd.css'
import Loader from 'components/admin/loader'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from 'configs/apollo'

export default function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <IndexRoute />
        </Suspense>
      </BrowserRouter>
    </ApolloProvider>
  )
}
