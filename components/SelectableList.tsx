import { View, Text } from '@/components/themed'
import { PRIMARY } from '@/constants/Colors'
import { FONT_SIZE } from '@/constants/styling'
import { useThemeColor } from '@/hooks/useThemeColor'
import React, { ReactNode } from 'react'
import { TouchableOpacity } from 'react-native'

const BORDER_RADIUS = 14

const SelectableList = ({
  title,
  description,
  renderItem,
  isSelected,
  onPress,
}: {
  title: string
  description: string
  renderItem?: ReactNode
  isSelected?: boolean
  onPress: () => void
}) => {
  const bgColor = useThemeColor({}, 'secondaryBackground')

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        isSelected
          ? {
              borderWidth: 1.5,
              borderColor: PRIMARY,
              padding: 2,
              borderRadius: BORDER_RADIUS,
            }
          : {},
      ]}
    >
      <View
        style={{
          width: '100%',
          padding: 16,
          backgroundColor: bgColor,
          borderRadius: BORDER_RADIUS,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            backgroundColor: bgColor,
            alignItems: 'center',
          }}
        >
          {renderItem}
          <View style={{ backgroundColor: bgColor, flex: 1 }}>
            <Text style={{ fontWeight: '700' }}>{title}</Text>
            <Text style={{ fontSize: FONT_SIZE.DESCRIPTION, marginTop: 4 }}>
              {description}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SelectableList
