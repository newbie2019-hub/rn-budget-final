import { TouchableOpacity } from 'react-native'
import { View, Text } from './themed'
import React from 'react'
import { FONT_SIZE } from '@/constants/styling'
import { formatCurrency } from 'react-native-format-currency'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Transactions } from '@/db/schema'

const ListTransaction = ({
  transaction,
  handleOnPress,
}: {
  transaction: Transactions
  handleOnPress: () => void
}) => {
  const color = useThemeColor({}, 'text')

  const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] =
    formatCurrency({ amount: +transaction.amount, code: 'USD' })

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 4,
          marginVertical: 12,
        }}
        type="secondaryBackground"
      >
        <View
          style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}
          type="secondaryBackground"
        >
          <Ionicons
            name="fast-food"
            size={22}
            color={color}
          />
          <View
            style={{ gap: 3 }}
            type="secondaryBackground"
          >
            <Text style={{ fontSize: FONT_SIZE.PARAGRAPH }}>
              {transaction.category_id}
            </Text>
            <Text style={{ color: 'gray', fontSize: FONT_SIZE.CHIP }}>
              {transaction.created_at?.toString()}
            </Text>
          </View>
        </View>
        <View
          style={{ gap: 3 }}
          type="secondaryBackground"
        >
          <Text
            style={{
              textAlign: 'right',
              fontSize: FONT_SIZE.PARAGRAPH,
            }}
          >
            {transaction.type.toLowerCase() === 'expense' ? '-' : '+'}
            {valueFormattedWithSymbol}
          </Text>
          <Text
            style={{
              color: 'gray',
              fontSize: FONT_SIZE.CHIP,
              textAlign: 'right',
            }}
          >
            {transaction.type}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ListTransaction
