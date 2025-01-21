import { View } from '@/components/themed/index'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserHeading, Wallet, Transactions } from '@/components/home'
import { defaultStyles } from '@/constants/styling'
import { useThemeColor } from '@/hooks/useThemeColor'

const Page = () => {
  const bgColor = useThemeColor({}, 'background')

  return (
    <SafeAreaView
      edges={['left', 'top', 'right']}
      style={{ flex: 1, backgroundColor: bgColor }}
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
