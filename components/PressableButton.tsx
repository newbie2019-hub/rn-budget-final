import { TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { FONT_SIZE } from '@/constants/styling'
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { View, Text } from './themed'
import { useThemeColor } from '@/hooks/useThemeColor'

interface PressableButtonProps {
  options: {
    label: string
    value: string
  }[]
  value: string | number
  onPress: (value: TransactionType) => void
}

const width = [82, 80, 78]

const PressableButton = ({ options, value, onPress }: PressableButtonProps) => {
  const selectedPositionX = useSharedValue(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const chipColor = useThemeColor({}, 'chipColor')

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: selectedPositionX.value }],
  }))

  const totalWidth = useCallback((newIndex: number) => {
    const v = width.slice(0, newIndex).reduce((acc, val) => (acc += val), 0)

    if (newIndex === 1) {
      return v - 5
    }

    if (newIndex === 2) {
      return v - 10
    }

    return v
  }, [])

  const handlePress = useCallback(
    (value: string, index: number) => {
      setCurrentIndex(index)
      onPress(value as TransactionType)

      selectedPositionX.value = withSpring(totalWidth(index), {
        stiffness: 200,
        damping: 15,
        reduceMotion: ReduceMotion.System,
        overshootClamping: true, // Prevents overshooting entirely
        restSpeedThreshold: 0.01, // Sets a lower threshold for resting
        restDisplacementThreshold: 0.01,
      })
    },
    [selectedPositionX, totalWidth, onPress],
  )

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 20,
        marginHorizontal: 'auto',
        marginTop: 10,
        borderColor: 'gray',
        paddingHorizontal: 14,
        paddingVertical: 10,
      }}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            position: 'absolute',
            backgroundColor: chipColor,
            opacity: 0.45,
            borderRadius: 30,
            top: 3,
            height: 32,
            left: 1,
            width: width[currentIndex],
          },
        ]}
      />
      {options.map((opt, index) => (
        <TouchableOpacity
          onPress={() => handlePress(opt.value, index)}
          key={opt.label}
        >
          <Text style={{ fontSize: FONT_SIZE.PARAGRAPH }}>{opt.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default PressableButton
