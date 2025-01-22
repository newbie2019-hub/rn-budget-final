import { View, Text } from '@/components/themed'
import AddCardWallet from '@/components/wallet/AddCardWallet'
import CardWallet from '@/components/wallet/CardWallet'
import { defaultStyles, FONT_SIZE } from '@/constants/styling'
import { useThemeColor, useWalletTheme } from '@/hooks/useThemeColor'
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { useSQLiteContext } from 'expo-sqlite'
import { useCallback, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as schema from '@/db/schema'
import { Colors } from '@/constants/Colors'
import { Link, useFocusEffect } from 'expo-router'

const Wallet = () => {
  const db = useSQLiteContext()
  const drizzleDb = drizzle(db, { schema })
  const [wallets, setWallets] = useState<schema.Wallets[]>([])

  useFocusEffect(
    useCallback(() => {
      const getWallets = async () => {
        const data = await drizzleDb.query.wallet.findMany()
        setWallets(data)
      }

      getWallets()
    }, []),
  )

  const bgColor = useThemeColor({}, 'background')

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: bgColor }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
        <View style={[defaultStyles.container]}>
          <Text style={{ fontSize: FONT_SIZE.HEADING }}>Accounts</Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ gap: 8, marginTop: 16 }}
            showsHorizontalScrollIndicator={false}
          >
            {wallets.length > 0 && <AddCardWallet />}
            {wallets.map((wallet) => (
              <CardWallet
                key={wallet.id}
                theme={wallet.theme as keyof typeof Colors.cards}
                wallet={wallet}
              />
            ))}
          </ScrollView>
          {wallets.length === 0 && (
            <View
              style={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Link href={'/(modals)/add-wallet'}>
                <Text>Add Account</Text>
              </Link>
              <Text>No Accounts Added 🙁</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Wallet
