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
import { Link, router, useFocusEffect } from 'expo-router'
import { eq, isNotNull, sql } from 'drizzle-orm'
import Animated, { LinearTransition } from 'react-native-reanimated'
import Button from '@/components/Button'

const Wallet = () => {
  const db = useSQLiteContext()
  const drizzleDb = drizzle(db, { schema })
  const [wallets, setWallets] = useState<schema.Wallets[]>([])

  const fetchWallets = useCallback(() => {
    const getWallets = async () => {
      const data = await drizzleDb.query.wallet.findMany()
      setWallets(data)
    }

    getWallets()
  }, [])

  useFocusEffect(fetchWallets)

  const handleDelete = async (id: number) => {
    await drizzleDb
      .delete(schema.wallet)
      .where(eq(schema.wallet.id, id))
      .then(() => fetchWallets())
  }

  const handleUpdate = async () => {}

  const handleSetActive = async (id: number) => {
    await drizzleDb
      .update(schema.wallet)
      .set({ active_at: null })
      .where(isNotNull(schema.wallet.created_at))
      .then(() => fetchWallets())

    await drizzleDb
      .update(schema.wallet)
      .set({ active_at: new Date() })
      .where(eq(schema.wallet.id, id))
      .then(() => fetchWallets())
  }

  const bgColor = useThemeColor({}, 'background')

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: bgColor }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
        <View style={[defaultStyles.container]}>
          <Text style={{ fontSize: FONT_SIZE.HEADING }}>Accounts</Text>
          <Animated.FlatList
            data={wallets}
            renderItem={({ item }) => (
              <CardWallet
                key={item.id}
                theme={item.theme as keyof typeof Colors.cards}
                wallet={item}
                onDelete={() => handleDelete(item.id)}
                onUpdate={handleUpdate}
                onSetActive={() => handleSetActive(item.id)}
              />
            )}
            horizontal={true}
            contentContainerStyle={{ gap: 8, marginVertical: 14 }}
            showsHorizontalScrollIndicator={false}
            itemLayoutAnimation={LinearTransition}
          />
          <Button
            label="Add Account"
            onPress={() => router.push('/(modals)/add-wallet')}
          />
          {wallets.length === 0 && (
            <View
              style={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Link href={'/(modals)/add-wallet'}>
                <Text style={{ color: '#4c8df5' }}>Add Account</Text>
              </Link>
              <Text style={{ marginTop: 12 }}>No Accounts Added 🙁</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Wallet
