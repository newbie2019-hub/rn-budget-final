import { View } from '@/components/themed'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Feedback = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: 5,
          backgroundColor: 'gray',
          width: 40,
          borderRadius: 20,
          marginTop: 10,
          marginHorizontal: 'auto',
        }}
      ></View>
    </SafeAreaView>
  )
}

export default Feedback
