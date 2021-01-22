import * as React from 'react'
import { EventType } from '@testing-library/react'

declare const Drawer: React.FunctionComponent<DrawerProps>

export interface DrawerProps{
  visible: boolean
  onClose: (e: EventType) => void
  title: string
  footDef: FootDef[]
}

export interface FootDef{
  name: string
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  visible?: boolean
  type?: FooterBtnType
}

export declare type FooterBtnType = "text" | "link" | "ghost" | "default" | "primary" | "dashed"

export default Drawer