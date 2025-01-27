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
import { useAppStore } from '@/store/appStore'

const Page = () => {
  const currency = useAppStore((state) => state.currency)

  const db = useSQLiteContext()
  const drizzleDb = drizzle(db, { schema })

  const bgColor = useThemeColor({}, 'background')

  const [activeWallet, setActiveWallet] = useState<schema.Wallets | null>(null)
  const [transactions, setTransactions] = useState<
    schema.TransactionsWithCategory[]
  >([])

  const fetchWallets = useCallback(() => {
    const getWallets = async () => {
      try {
        const data = await drizzleDb.query.wallet.findFirst({
          where: isNotNull(schema.wallet.active_at),
        })
        if (data) {
          setActiveWallet(data)

          const transactionsData = await drizzleDb.query.transactions.findMany({
            where: eq(schema.transactions.wallet_id, data?.id!),
            with: { category: true },
          })

          setTransactions(transactionsData)
        }
      } catch (error) {
        console.dir(error, { depth: 2 })
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
        <Wallet
          wallet={activeWallet}
          currency={currency}
        />
      </View>
      <Transactions
        transactions={transactions}
        currency={currency}
      />
    </SafeAreaView>
  )
}

export default Page
