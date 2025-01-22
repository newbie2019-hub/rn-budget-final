import { StyleSheet, TouchableOpacity } from 'react-native'
import { View } from '../themed'
import { Feather } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Link } from 'expo-router'

const AddCardWallet = () => {
  const color = useThemeColor({}, 'text')
  const walletBg = useThemeColor({}, 'addWalletBg')

  return (
    <Link
      href={'/(modals)/add-wallet'}
      asChild
    >
      <TouchableOpacity>
        <View style={[styles.card, { backgroundColor: walletBg }]}>
          <Feather
            name="plus-circle"
            size={25}
            color={color}
          />
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default AddCardWallet

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 190,
    width: 90,
    borderRadius: 10,
  },
})
