import * as React from 'react'

declare const RPassword: React.FunctionComponent<RInputProps>

export default RPassword

export interface RInputProps{
  name: string
  label: string
  rules?: Rules
  disabled?: boolean
  visible?: boolean
  prefix?: React.ReactNode
  placeholder?: string
  onChange?: Function
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