import { View, Text } from '@/components/themed'
import { FONT_SIZE } from '@/constants/styling'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'

const BORDER_RADIUS = 14

const Preview = () => {
  const bgColor = useThemeColor({}, 'secondaryBackground')
  const text = useThemeColor({}, 'text')

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: bgColor,
        alignItems: 'center',
        borderRadius: BORDER_RADIUS,
        gap: 12,
      }}
    >
      <Ionicons
        name="wallet-outline"
        size={28}
        color={text}
      />
      <View style={{ flex: 1, backgroundColor: bgColor }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: bgColor,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: '700' }}>Kaperas</Text>
          <Text style={{ fontSize: FONT_SIZE.CHIP }}>2m ago</Text>
        </View>
        <Text style={{ fontSize: FONT_SIZE.DESCRIPTION, marginTop: 4 }}>
          You haven't added any transactions today, did you make any purchase?
        </Text>
      </View>
    </View>
  )
}

export default Preview
