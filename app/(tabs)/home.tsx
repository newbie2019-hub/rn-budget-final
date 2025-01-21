import { View } from '@/components/themed/index'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserHeading, Wallet, Transactions } from '@/components/home'
import { defaultStyles } from '@/constants/styling'
import { CUSTOM_BG } from '@/constants/Colors'

const Page = () => {
  return (
    <SafeAreaView
      edges={['left', 'top', 'right']}
      style={{ flex: 1, backgroundColor: CUSTOM_BG }}
    >
      <View style={defaultStyles.container}>
        <UserHeading />
        <Wallet />
      </View>
      <Transactions />
    </SafeAreaView>
  )
}

export default Page
