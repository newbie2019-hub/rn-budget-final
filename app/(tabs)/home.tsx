import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import React, { useCallback, useState } from 'react'
import { UserHeading, Wallet, Transactions } from '@/components/home'
import { View } from '@/components/themed/index'
import { defaultStyles } from '@/constants/styling'
import { useThemeColor } from '@/hooks/useThemeColor'
import { eq, isNotNull } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import * as schema from '@/db/schema'

const Page = () => {
  const db = useSQLiteContext()
  const drizzleDb = drizzle(db, { schema })

  const bgColor = useThemeColor({}, 'background')

  const [activeWallet, setActiveWallet] = useState<schema.Wallets | null>(null)
  const [transactions, setTransasctions] = useState<schema.Transactions[]>([])

  const fetchWallets = useCallback(() => {
    const getWallets = async () => {
      const data = await drizzleDb.query.wallet.findFirst({
        where: isNotNull(schema.wallet.active_at),
      })

      if (data) {
        setActiveWallet(data)

        const transactionsData = await drizzleDb.query.transactions.findMany({
          where: eq(schema.wallet.id, activeWallet?.id!),
        })

        if (transactionsData) {
          setTransasctions(transactionsData)
        }
      }
    }

    getWallets()
  }, [])

  useFocusEffect(fetchWallets)

  return (
    <SafeAreaView
      edges={['left', 'top', 'right']}
      style={{ flex: 1, backgroundColor: bgColor }}
    >
      <View style={defaultStyles.container}>
        <UserHeading />
        <Wallet wallet={activeWallet} />
      </View>
      <Transactions transactions={transactions} />
    </SafeAreaView>
  )
}

export default Page
