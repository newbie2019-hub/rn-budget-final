import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FONT_SIZE } from '@/constants/styling'

interface ButtonProps {
  label: string
  textColor?: string
  color?: string
  onPress: () => void
}

const Button = ({
  label,
  color = '#466ee3',
  textColor = 'white',
  onPress,
}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          padding: 18,
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 24,
        }}
      >
        <Text style={{ fontSize: FONT_SIZE.PARAGRAPH, color: textColor }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button
