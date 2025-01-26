import { Suspense, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'

import { Stack } from 'expo-router'
import * as SQLite from 'expo-sqlite'

import { useThemeColor } from '@/hooks/useThemeColor'

import { Text, View } from '@/components/themed'

import { useDrizzleStudio } from 'expo-drizzle-studio-plugin'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import migrations from '@/drizzle/migrations'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { addDummyData } from '@/db/addDummyData'
import { StatusBar } from 'expo-status-bar'

const DB_NAME = 'budget_app'

export default function RootLayout() {
  const expo = SQLite.openDatabaseSync(DB_NAME)
  const db = drizzle(expo)

  useDrizzleStudio(expo)

  const { success, error } = useMigrations(db, migrations)
  const background = useThemeColor({}, 'background')

  useEffect(() => {
    if (success) {
      addDummyData(db)
    }
  }, [success])

  if (error) {
    return (
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <Text>Migration error: {error.message}</Text>
      </View>
    )
  }

  if (!success) {
    return (
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <Text>Migration is in progress...</Text>
      </View>
    )
  }

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLite.SQLiteProvider
        databaseName={DB_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: background },
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="index"
            options={{ title: 'Home' }}
          />
          <Stack.Screen
            name="(modals)/new-transaction"
            options={{
              title: 'New Transaction',
              headerShown: false,
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="(modals)/change-wallet"
            options={{
              title: 'Select Wallet',
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="(modals)/category"
            options={{
              title: 'Categories',
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="(modals)/add-wallet"
            options={{
              title: 'Add Account',
              presentation: 'modal',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(modals)/reminders"
            options={{
              title: 'Reminders',
              presentation: 'modal',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(modals)/about"
            options={{
              title: 'About Kaperas',
              presentation: 'modal',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(modals)/support/feedback"
            options={{
              title: 'Feedback',
              presentation: 'modal',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(modals)/support/feature-request"
            options={{
              title: 'Feature Request',
              presentation: 'modal',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(modals)/account/currency-selection"
            options={{
              title: 'Select Currency',
              presentation: 'modal',
              headerShown: false,
            }}
          />
        </Stack>
      </SQLite.SQLiteProvider>
    </Suspense>
  )
}
