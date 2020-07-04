import * as React from 'react'

export interface RSelectProps{
  disabled?: boolean
  name: string
  label: string
  data: object[]
  prefix: React.ReactNode
  showSearch: boolean
  placeholder: string
  required?: boolean
  filterProps: (row: object) => string[]
  onChange: (value: any) => void
  refetch: () => void
  optionRender: (row: object) => React.ReactNode
  optionValue: (row: object) => any
}

declare const RSelect: React.FunctionComponent<RSelectProps>

export default RSelect