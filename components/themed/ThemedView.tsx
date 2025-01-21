import { View as RNView, type ViewProps } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'
import { Colors } from '@/constants/Colors'

export type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
  type?: keyof typeof Colors.light & keyof typeof Colors.dark
}

export function View({
  style,
  lightColor,
  darkColor,
  type,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    type ?? 'background',
  )

  return (
    <RNView
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  )
}
