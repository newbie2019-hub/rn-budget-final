import { View, Text } from '@/components/themed'
import CardWallet from '@/components/wallet/CardWallet'
import { defaultStyles, FONT_SIZE } from '@/constants/styling'
import { useThemeColor } from '@/hooks/useThemeColor'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useSQLiteContext } from 'expo-sqlite'
import { useCallback, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as schema from '@/db/schema'
import { Colors } from '@/constants/Colors'
import { Link, router, useFocusEffect } from 'expo-router'
import { eq, isNotNull } from 'drizzle-orm'
import Animated, { LinearTransition } from 'react-native-reanimated'
import Button from '@/components/Button'
import { useAppStore } from '@/store/appStore'
import { useWalletStore } from '@/store/walletStore'

const Wallet = () => {
  const wallets = useWalletStore((state) => state.wallets)
  const setWallets = useWalletStore((state) => state.setWallets)

  const currency = useAppStore((state) => state.currency)

  const db = useSQLiteContext()
  const drizzleDb = drizzle(db, { schema })

  const fetchWallets = useCallback(() => {
    const getWallets = async () => {
      const data = await drizzleDb.query.wallet.findMany({
        orderBy: (wallets, { desc }) => [desc(wallets.created_at)],
      })

      setWallets(
        data.sort((a, b) => {
          // Check if active_at is null or empty and prioritize non-null/non-empty first
          if (a.active_at && !b.active_at) return -1
          if (!a.active_at && b.active_at) return 1

          return 0
        }),
      )
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
          <Text style={{ fontSize: FONT_SIZE.HEADING }}>Wallets</Text>
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
                currency={currency}
                width={160}
                showActive
              />
            )}
            horizontal={true}
            contentContainerStyle={{ gap: 8, marginVertical: 14 }}
            showsHorizontalScrollIndicator={false}
            itemLayoutAnimation={LinearTransition}
          />
          {wallets.length > 0 && (
            <Button
              label="Add Wallet"
              onPress={() => router.push('/(modals)/add-wallet')}
            />
          )}
          {wallets.length === 0 && (
            <View
              style={{
                height: '70%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Link href={'/(modals)/add-wallet'}>
                <Text style={{ color: '#4c8df5' }}>Add Wallet</Text>
              </Link>
              <Text style={{ marginTop: 12 }}>No Wallet Added</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Wallet
