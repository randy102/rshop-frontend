import * as React from 'react'

declare const RInput: React.FunctionComponent<RInputProps>

export default RInput

export interface RInputProps{
  name: string
  label: string
  rules?: Rules
  disabled?: boolean
  visible?: boolean
  placeholder?: string
  prefix?: React.ReactNode
  onChange?: Function
  value?: any
}
export interface Rules{
  max?: number;
  message?: string | ReactElement;
  min?: number;
  pattern?: RegExp;
  required?: boolean;
  type?: RuleType!;
}

export declare type RuleType = 'url' | 'email';