import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import Entypo from '@expo/vector-icons/Entypo'
import { FONT_SIZE } from '@/constants/styling'
import { View, Text } from '../themed'
import * as schema from '@/db/schema'

import { useThemeColor } from '@/hooks/useThemeColor'

import Menu from './Menu'
import { formatCurrency } from 'react-native-format-currency'

const Wallet = ({ wallet }: { wallet: schema.Wallets | null }) => {
  const color = useThemeColor({}, 'text')
  const textSecondary = useThemeColor({}, 'textSecondary')

  const [isShown, setIsShown] = useState(true)

  const [valWithSymbol, valWithoutSymbol, symbol] = formatCurrency({
    amount: Number(wallet?.amount || 0),
    code: 'USD',
  })

  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={{ fontSize: FONT_SIZE.PARAGRAPH, color: textSecondary }}>
        Wallet Balance
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: FONT_SIZE.AMOUNT }}>{symbol}</Text>
          <Text style={{ fontSize: FONT_SIZE.AMOUNT }}>
            {isShown ? valWithoutSymbol : '****'}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setIsShown((isShown) => !isShown)}>
          <Entypo
            name={isShown ? 'eye' : 'eye-with-line'}
            size={24}
            color={color}
          />
        </TouchableOpacity>
      </View>
      <Menu />
    </View>
  )
}

export default Wallet
