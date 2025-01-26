import { TextInput, ScrollView, Dimensions } from 'react-native'
import React, { useCallback, useState } from 'react'
import { FONT_SIZE } from '@/constants/styling'
import ListOption from '@/components/transaction/ListOption'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'
import { View, Text } from '@/components/themed'
import { useThemeColor, useWalletTheme } from '@/hooks/useThemeColor'
import ThemePicker from '@/components/wallet/ThemePicker'
import { Colors } from '@/constants/Colors'
import { useSQLiteContext } from 'expo-sqlite'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import * as schema from '@/db/schema'
import { count } from 'drizzle-orm'

const NewTransaction = () => {
  const width = Dimensions.get('window').width

  const router = useRouter()
  const db = useSQLiteContext()
  const drizzleDb = drizzle(db, { schema })

  const textColor = useThemeColor({}, 'text')
  const color = useThemeColor({}, 'placeholder')
  const textSecondary = useThemeColor({}, 'textSecondary')

  const [theme, setTheme] = useState<keyof typeof Colors.cards>('celadon')
  const [amount, setAmount] = useState('')
  const [walletName, setWalletName] = useState('')
  const [notes, setNotes] = useState('')

  const selectedTheme = useWalletTheme(theme)

  const onSubmit = useCallback(async () => {
    try {
      // Check if there is a wallet that has an active state
      const [result] = await drizzleDb
        .select({ count: count() })
        .from(schema.wallet)

      const wallet: Omit<schema.Wallets, 'id' | 'updated_at' | 'deleted_at'> = {
        wallet: walletName,
        amount: +amount,
        notes: notes,
        theme: theme,
        created_at: new Date(),
        active_at: null,
      }

      if (result.count === 0) {
        wallet.active_at = new Date()
      }

      await drizzleDb.insert(schema.wallet).values(wallet)
    } catch (error) {
      console.log('Error saving wallet: ', error)
    }

    router.back()
  }, [amount, notes, theme, walletName])

  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={{ flex: 0.86 }}>
        <View
          style={{
            height: 5,
            backgroundColor: 'gray',
            width: 40,
            borderRadius: 20,
            marginTop: 8,
            marginHorizontal: 'auto',
          }}
        ></View>
        <Text
          style={{
            fontSize: FONT_SIZE.DESCRIPTION,
            textAlign: 'center',
            marginTop: 8,
            color: textSecondary,
          }}
        >
          ADD WALLET
        </Text>

        <View
          style={{
            paddingHorizontal: 20,
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ marginTop: 40 }}>
            <TextInput
              placeholder="0.00"
              keyboardType="numeric"
              style={{
                width: '100%',
                marginHorizontal: 'auto',
                fontSize: FONT_SIZE.AMOUNT,
                textAlign: 'center',
                color: textColor,
              }}
              value={amount}
              placeholderTextColor={color}
              onChangeText={setAmount}
              autoFocus
            />
            <Text
              style={{
                fontSize: FONT_SIZE.PARAGRAPH,
                textAlign: 'center',
                marginTop: 4,
                color: textColor,
              }}
            >
              Initial Balance
            </Text>

            <View style={{ marginTop: 60 }}>
              <ListOption
                icon={
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      backgroundColor: selectedTheme.background,
                      borderRadius: 40,
                      borderWidth: 1,
                      borderColor: 'white',
                    }}
                  ></View>
                }
                label="THEME"
                value={'Main Wallet'}
                renderItem={
                  <View style={{ marginTop: 2 }}>
                    <ThemePicker
                      theme={theme}
                      onSelect={setTheme}
                    />
                  </View>
                }
              />
              <ListOption
                icon={
                  <Ionicons
                    name="wallet-outline"
                    size={20}
                    color={'gray'}
                  />
                }
                label="ACCOUNT"
                value={'Main Wallet'}
                renderItem={
                  <TextInput
                    value={walletName}
                    onChangeText={setWalletName}
                    placeholder="Wallet Name"
                    style={{
                      fontSize: FONT_SIZE.PARAGRAPH,
                      color: textColor,
                      width,
                    }}
                    maxLength={30}
                  />
                }
              />
              <ListOption
                icon={
                  <FontAwesome
                    name="sticky-note-o"
                    size={20}
                    color="gray"
                  />
                }
                label="NOTES"
                value={'Medicine for cough'}
                renderItem={
                  <TextInput
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Enter your note here"
                    style={{
                      fontSize: FONT_SIZE.PARAGRAPH,
                      color: textColor,
                      width,
                    }}
                    maxLength={30}
                  />
                }
              />
            </View>
          </View>

          {/* Save Transaction */}
          <Button
            label="SAVE ACCOUNT"
            onPress={onSubmit}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default NewTransaction
