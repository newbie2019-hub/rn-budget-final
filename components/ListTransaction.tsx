import { TouchableOpacity } from 'react-native'
import { View, Text } from './themed'
import React from 'react'
import { FONT_SIZE } from '@/constants/styling'
import { SUBTLE_DARK } from '@/constants/Colors'
import { formatCurrency } from 'react-native-format-currency'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useThemeColor } from '@/hooks/useThemeColor'

const ListTransaction = ({
  amount,
  type,
  category,
  createdAt,
  handleOnPress,
}: ListTransaction & { handleOnPress: () => void }) => {
  const color = useThemeColor({}, 'text')

  const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] =
    formatCurrency({ amount: +amount, code: 'USD' })

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 4,
          marginVertical: 8,
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
            <Text style={{ fontSize: FONT_SIZE.PARAGRAPH }}>{category}</Text>
            <Text style={{ color: 'gray', fontSize: FONT_SIZE.CHIP }}>
              {createdAt as string}
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
            {type.toLowerCase() === 'expense' ? '-' : '+'}
            {valueFormattedWithSymbol}
          </Text>
          <Text
            style={{
              color: 'gray',
              fontSize: FONT_SIZE.CHIP,
              textAlign: 'right',
            }}
          >
            {type}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ListTransaction
