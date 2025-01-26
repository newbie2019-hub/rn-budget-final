import { ReactNode } from 'react'
import * as ContextMenu from 'zeego/context-menu'

export function WalletContext({
  children,
  onDelete,
  onUpdate,
  onSetActive,
  isActive,
}: {
  children: ReactNode
  isActive: boolean
  onDelete: () => void
  onUpdate: () => void
  onSetActive: () => void
}) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Content>
        {!isActive ? (
          <ContextMenu.Item
            key={'set-active'}
            onSelect={onSetActive}
          >
            <ContextMenu.ItemTitle>Set Active</ContextMenu.ItemTitle>
          </ContextMenu.Item>
        ) : null}
        <ContextMenu.Item
          key={'update'}
          onSelect={onUpdate}
        >
          <ContextMenu.ItemTitle>Update</ContextMenu.ItemTitle>
        </ContextMenu.Item>
        {!isActive && (
          <ContextMenu.Item
            key={'delete'}
            onSelect={onDelete}
          >
            <ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
          </ContextMenu.Item>
        )}
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}
