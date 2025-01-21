import { TouchableOpacity } from 'react-native'
import { FONT_SIZE } from '@/constants/styling'
import { View, Text } from '../themed'
import Entypo from '@expo/vector-icons/Entypo'
import { useThemeColor } from '@/hooks/useThemeColor'

import Menu from './Menu'

const Wallet = () => {
  const color = useThemeColor({}, 'text')

  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={{ fontSize: FONT_SIZE.PARAGRAPH }}>Wallet Balance</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <Text style={{ fontSize: FONT_SIZE.AMOUNT }}>₱2,000</Text>
        <TouchableOpacity>
          <Entypo
            name="eye"
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
