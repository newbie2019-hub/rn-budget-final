import { TouchableOpacity } from 'react-native'
import { View, Text } from './themed'
import React from 'react'
import { FONT_SIZE } from '@/constants/styling'
import { formatCurrency } from 'react-native-format-currency'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useThemeColor } from '@/hooks/useThemeColor'
import { TransactionsWithCategory } from '@/db/schema'
import { useAppStore } from '@/store/appStore'
import { formatDate } from '@/lib/helpers'

const ListTransaction = ({
  transaction,
  handleOnPress,
}: {
  transaction: TransactionsWithCategory
  handleOnPress: () => void
}) => {
  const color = useThemeColor({}, 'text')
  const currency = useAppStore((state) => state.currency)

  const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] =
    formatCurrency({ amount: +transaction.amount, code: currency })

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
              {transaction.category.category}
            </Text>
            <Text style={{ color: 'gray', fontSize: FONT_SIZE.CHIP }}>
              {formatDate(transaction?.created_at)}
            </Text>
          </View>
        </View>
        <View
          style={{ flex: 1, gap: 3 }}
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
              textTransform: 'capitalize',
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
