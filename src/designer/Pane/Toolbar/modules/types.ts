import { RendererElement, RendererNode, VNode } from 'vue'

export type iconNode = () => VNode<
  RendererNode,
  RendererElement,
  {
    [key: string]: any
  }
>
export interface ToolBarItemType {
  label: string
  action: (e: MouseEvent, ...others: any) => void
  disable?: (e: MouseEvent) => void
  icon: string | iconNode
  divider?: boolean
  location: 'left' | 'right' | 'middle'
  children?: ToolBarItemType[]
}
