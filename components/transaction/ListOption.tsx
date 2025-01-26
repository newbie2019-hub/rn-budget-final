import { TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { FONT_SIZE } from '@/constants/styling'
import { View, Text } from '@/components/themed'
import { useThemeColor } from '@/hooks/useThemeColor'

interface ListOptionProps {
  label: string
  value: string
  onPress?: () => void
  icon: ReactNode
  renderItem?: ReactNode
}

const ListOption = ({
  label,
  value,
  onPress,
  icon,
  renderItem,
}: ListOptionProps) => {
  const borderColor = useThemeColor({}, 'borderColor')

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 19,
        borderTopColor: borderColor,
        borderTopWidth: 1,
        gap: 14,
        paddingHorizontal: 12,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {icon}
        <View style={{ gap: 3 }}>
          <Text style={{ fontSize: FONT_SIZE.CHIP }}>{label}</Text>
          {renderItem ? (
            <>{renderItem}</>
          ) : (
            <Text style={{ fontSize: FONT_SIZE.PARAGRAPH, marginTop: 2 }}>
              {value}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ListOption
