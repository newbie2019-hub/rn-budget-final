import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import React, { useCallback, useState } from 'react'
import { UserHeading, Wallet, Transactions } from '@/components/home'
import { View } from '@/components/themed/index'
import { defaultStyles } from '@/constants/styling'
import { useThemeColor } from '@/hooks/useThemeColor'
import { and, eq, isNotNull, sql, sum } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import * as schema from '@/db/schema'
import { useAppStore } from '@/store/appStore'
import { HomeContext } from '@/context/useHomeContext'

const Page = () => {
  const currency = useAppStore((state) => state.currency)

  const db = useSQLiteContext()
  const drizzleDb = drizzle(db, { schema })

  const bgColor = useThemeColor({}, 'background')

  const [transactionSummary, setTransactionSummary] = useState<{
    income: number
    expense: number
  }>({ income: 0, expense: 0 })
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
          // Get all transactions
          setActiveWallet(data)

          const transactionsData = await drizzleDb.query.transactions.findMany({
            where: eq(schema.transactions.wallet_id, data?.id!),
            with: { category: true },
            limit: 15,
          })

          setTransactions(transactionsData)

          // Get summary of transactions
          const [totalIncome] = await drizzleDb
            .select({ total: sum(schema.transactions.amount) })
            .from(schema.transactions)
            .where(
              and(
                eq(schema.transactions.wallet_id, data?.id),
                eq(schema.transactions.type, 'income'),
              ),
            )

          const [totalExpense] = await drizzleDb
            .select({ total: sum(schema.transactions.amount) })
            .from(schema.transactions)
            .where(
              and(
                eq(schema.transactions.wallet_id, data?.id),
                eq(schema.transactions.type, 'expense'),
              ),
            )

          const income = totalIncome.total ?? 0
          const expense = totalExpense.total ?? 0

          setTransactionSummary({
            income: +income,
            expense: +expense,
          })

          console.log('Transaction Summary: ', transactionSummary)
        }
      } catch (error) {
        console.dir(error, { depth: 2 })
      }
    }

    getWallets()
  }, [])

  const deleteTransaction = useCallback(async (id: number) => {
    try {
      // Find wallet and reverse transaction
      const transaction = await drizzleDb.query.transactions.findFirst({
        where: eq(schema.transactions.id, id),
      })

      await drizzleDb.update(schema.wallet).set({
        amount:
          transaction?.type === 'income'
            ? sql`${schema.wallet.amount} - ${transaction.amount}`
            : sql`${schema.wallet.amount} + ${transaction?.amount}`,
      })

      // Delete transaction
      await drizzleDb
        .delete(schema.transactions)
        .where(eq(schema.transactions.id, id))

      fetchWallets()
    } catch (error) {
      console.dir(error, { depth: 2 })
    }
  }, [])

  useFocusEffect(fetchWallets)

  return (
    <SafeAreaView
      edges={['left', 'top', 'right']}
      style={{ flex: 1, backgroundColor: bgColor }}
    >
      <HomeContext.Provider value={{ deleteTransaction, transactionSummary }}>
        <View style={defaultStyles.container}>
          <UserHeading />
          <Wallet
            wallet={activeWallet}
            currency={currency}
          />
        </View>
        <Transactions transactions={transactions} />
      </HomeContext.Provider>
    </SafeAreaView>
  )
}

export default Page
