import { TextInput, ScrollView } from 'react-native'
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

const NewTransaction = () => {
  const router = useRouter()
  const db = useSQLiteContext()
  const drizzleDb = drizzle(db, { schema })

  const textColor = useThemeColor({}, 'text')
  const color = useThemeColor({}, 'placeholder')

  const [theme, setTheme] = useState<keyof typeof Colors.cards>('celadon')
  const [amount, setAmount] = useState('')
  const [walletName, setWalletName] = useState('')
  const [notes, setNotes] = useState('')

  const selectedTheme = useWalletTheme(theme)

  const onSubmit = useCallback(async () => {
    await drizzleDb.insert(schema.wallet).values({
      wallet: walletName,
      amount: +amount,
      notes: notes,
      theme: theme,
      created_at: new Date(),
    })

    router.back()
  }, [amount, notes, theme, walletName])

  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={{ flex: 0.85 }}>
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
          }}
        >
          ADD ACCOUNT
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
                    style={{ fontSize: FONT_SIZE.PARAGRAPH, color: textColor }}
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
                    style={{ fontSize: FONT_SIZE.PARAGRAPH, color: textColor }}
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
