import { ReactNode } from 'react'
import * as ContextMenu from 'zeego/context-menu'
import { Text } from '../themed'

export function WalletContext({ children }: { children: ReactNode }) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item key={'update'}>
          <ContextMenu.ItemTitle>Update</ContextMenu.ItemTitle>
        </ContextMenu.Item>
        <ContextMenu.Item key={'delete'}>
          <ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}
