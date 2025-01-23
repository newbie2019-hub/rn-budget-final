import { ReactNode } from 'react'
import * as ContextMenu from 'zeego/context-menu'

export function WalletContext({
  children,
  onDelete,
  onUpdate,
  onSetActive,
}: {
  children: ReactNode
  onDelete: () => void
  onUpdate: () => void
  onSetActive: () => void
}) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item
          key={'set-active'}
          onSelect={onSetActive}
        >
          <ContextMenu.ItemTitle>Set Active</ContextMenu.ItemTitle>
        </ContextMenu.Item>
        <ContextMenu.Item
          key={'update'}
          onSelect={onUpdate}
        >
          <ContextMenu.ItemTitle>Update</ContextMenu.ItemTitle>
        </ContextMenu.Item>
        <ContextMenu.Item
          key={'delete'}
          onSelect={onDelete}
        >
          <ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}
