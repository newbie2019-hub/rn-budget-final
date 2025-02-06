import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { FONT_SIZE } from '@/constants/styling'

interface ButtonProps {
  label: string
  textColor?: string
  color?: string
  onPress: () => void
  disabled?: boolean
  isLoading?: boolean
}

const Button = ({
  label,
  color = '#466ee3',
  textColor = 'white',
  onPress,
  isLoading,
  disabled,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={{
          padding: 18,
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 6,
          borderRadius: 24,
        }}
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={textColor}
          />
        ) : (
          <Text style={{ fontSize: FONT_SIZE.PARAGRAPH, color: textColor }}>
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default Button
