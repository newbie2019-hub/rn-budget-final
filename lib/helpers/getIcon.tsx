import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'

export const getIcon = ({
  icon,
  iconType,
  size,
  color,
}: {
  icon: string
  iconType: string
  size: number
  color: string
}) => {
  const defaultProps = { size, color }

  return {
    Ionicons: (
      <Ionicons
        name={icon as keyof typeof Ionicons.glyphMap}
        {...defaultProps}
      />
    ),
    MaterialIcons: (
      <MaterialIcons
        name={icon as keyof typeof MaterialIcons.glyphMap}
        {...defaultProps}
      />
    ),
    Entypo: (
      <Entypo
        name={icon as keyof typeof Entypo.glyphMap}
        {...defaultProps}
      />
    ),
  }[iconType]
}
