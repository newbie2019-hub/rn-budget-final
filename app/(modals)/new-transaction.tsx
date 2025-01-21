import {
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import React, { useRef, useState } from 'react'
import { FONT_SIZE } from '@/constants/styling'
import ListOption from '@/components/transaction/ListOption'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Button from '@/components/Button'
import PressableButton from '@/components/PressableButton'
import { useRouter } from 'expo-router'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import BottomSheet from '@/components/BottomSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { View, Text } from '@/components/themed'
import { useThemeColor } from '@/hooks/useThemeColor'

type Options = {
  label: string
  value: TransactionType
}[]

const options: Options = [
  {
    label: 'Expense',
    value: 'expense',
  },
  {
    label: 'Income',
    value: 'income',
  },
  {
    label: 'Transfer',
    value: 'transfer',
  },
]

const NewTransaction = () => {
  const router = useRouter()
  const color = useThemeColor({}, 'placeholder')

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const [type, setType] = useState<TransactionType>('expense')
  const [date, setDate] = useState(new Date())

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate ?? new Date()
    bottomSheetModalRef.current?.close()
    setDate(currentDate)
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ flex: 0.85 }}>
          <View
            style={{
              height: 5,
              backgroundColor: 'gray',
              width: 40,
              borderRadius: 20,
              marginTop: 6,
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
            NEW TRANSACTION
          </Text>

          <View
            style={{
              paddingHorizontal: 20,
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <View style={{ marginTop: 40 }}>
              <Text style={{ fontSize: FONT_SIZE.CHIP, textAlign: 'center' }}>
                Enter Amount
              </Text>
              <TextInput
                placeholder="0.00"
                keyboardType="numeric"
                style={{
                  width: '100%',
                  marginHorizontal: 'auto',
                  fontSize: FONT_SIZE.AMOUNT,
                  textAlign: 'center',
                  color: 'green',
                }}
                placeholderTextColor={color}
              />
              <PressableButton
                options={options}
                value={type}
                onPress={setType}
              />
            </View>
            <View>
              <ListOption
                icon={
                  <Ionicons
                    name="wallet-outline"
                    size={20}
                    color={'gray'}
                  />
                }
                label="WALLET"
                value={'Main Wallet'}
                onPress={() => router.push('/(modals)/change-wallet')}
              />
              <ListOption
                icon={
                  <FontAwesome
                    name="calendar"
                    size={20}
                    color="gray"
                  />
                }
                label="DATE"
                value={date.toString()}
                onPress={() => bottomSheetModalRef.current?.present()}
              />
              <ListOption
                icon={
                  <MaterialCommunityIcons
                    name="format-list-bulleted-type"
                    size={20}
                    color="gray"
                  />
                }
                label="CATEGORY"
                value={'Miscellaneous'}
                onPress={() => router.push('/(modals)/category')}
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
                    defaultValue="Hello World"
                    placeholder="Enter your note here"
                    style={{ fontSize: FONT_SIZE.PARAGRAPH }}
                    maxLength={30}
                  />
                }
              />
            </View>
            {/* Save Transaction */}
            <Button
              label="SAVE TRANSACTION"
              onPress={() => alert('Save Transaction')}
            />
          </View>
        </View>
        <BottomSheet ref={bottomSheetModalRef}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="inline"
            onChange={onChange}
            style={{ backgroundColor: 'transparent' }}
          />
        </BottomSheet>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default NewTransaction
