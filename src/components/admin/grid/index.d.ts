import * as React from 'react'
import { ColumnType } from 'antd/lib/list'
import { ColumnsType } from 'antd/lib/table'

declare const Grid: React.FunctionComponent<GridProps>

export interface GridProps{
  data: any[]
  colDef: ColumnsType<any>
  headDef: HeaderType[]
  loading?: boolean
}

export interface HeaderType{
  icon: string
  name: string
  selection?: 'multiple' | 'single'
  onClick: (rows: any[]) => void
  type?: HeaderBtnType
  confirm: boolean
  confirmMessage: string
}

export type HeaderBtnType = 'create' | 'read' | 'update' | 'delete' | 'refresh' | 'detail'

export default Grid