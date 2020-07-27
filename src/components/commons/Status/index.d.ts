import * as React from 'react'

declare const Status: React.FunctionComponent<StatusProps>

export interface StatusProps{
  type?: StatusType
  content: string
}

export type StatusType = 'active' | 'inactive' | 'pending'

export default Status