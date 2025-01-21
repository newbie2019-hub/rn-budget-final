import { StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text } from '../themed'
import { FONT_SIZE } from '@/constants/styling'
import Ionicons from '@expo/vector-icons/Ionicons'
import AntDesign from '@expo/vector-icons/AntDesign'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { Link } from 'expo-router'
import { useThemeColor } from '@/hooks/useThemeColor'

const ICON_SIZE = 20

const Menu = () => {
  const color = useThemeColor({}, 'text')
  const secondaryBg = useThemeColor({}, 'secondaryBackground')

  return (
    <View
      style={styles.container}
      type="secondaryBackground"
    >
      <View
        style={styles.option}
        type="secondaryBackground"
      >
        <TouchableOpacity style={{ flex: 1, alignItems: 'center', gap: 6 }}>
          <SimpleLineIcons
            name="options"
            size={ICON_SIZE}
            color={color}
          />
          <Text style={{ fontSize: FONT_SIZE.CHIP }}>Details</Text>
        </TouchableOpacity>
      </View>
      <View
        style={styles.option}
        type="secondaryBackground"
      >
        <Link
          href={'/(modals)/change-wallet'}
          asChild
        >
          <TouchableOpacity style={{ alignItems: 'center', gap: 6 }}>
            <Ionicons
              name="wallet-outline"
              size={ICON_SIZE}
              color={color}
            />
            <Text style={{ fontSize: FONT_SIZE.CHIP }}>Change Wallet</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          gap: 6,
        }}
        type="secondaryBackground"
      >
        <TouchableOpacity style={{ flex: 1, alignItems: 'center', gap: 6 }}>
          <AntDesign
            name="swap"
            size={ICON_SIZE}
            color={color}
          />
          <Text style={{ fontSize: FONT_SIZE.CHIP }}>Transfer</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 14,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    borderRightWidth: 1,
    borderRightColor: 'gray',
  },
})
