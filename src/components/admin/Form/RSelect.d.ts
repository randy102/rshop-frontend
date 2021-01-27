import * as React from 'react'

export interface RSelectProps{
  mode?: 'multiple' | 'tags'
  disabled?: boolean
  name: string
  label: string
  data: object[]
  prefix?: React.ReactNode
  showSearch?: boolean
  placeholder: string
  required?: boolean
  filterProps?: (row: object) => string[]
  onChange: (value: any) => void
  onSearch?: (input: string) => void
  refetch: () => void
  optionRender: (row: any) => React.ReactNode
  optionValue: (row: any) => any
  labelRender: (row: any) => React.ReactNode
  validator?: (rule: any, value: any) => Promise<string>
}

declare const RSelect: React.FunctionComponent<RSelectProps>

export default RSelect