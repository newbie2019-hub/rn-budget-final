import { TouchableOpacity } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons'

import { Text, View } from '../themed'
import { FONT_SIZE, ICON_SIZE } from '@/constants/styling'
import { useThemeColor } from '@/hooks/useThemeColor'

const UserHeading = () => {
  const color = useThemeColor({}, 'text')

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
      }}
    >
      <View>
        <Text style={{ fontSize: FONT_SIZE.HEADING }}>Hi, John</Text>
        <Text style={{ fontSize: FONT_SIZE.PARAGRAPH }}>Good Morning!</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 14 }}>
        <TouchableOpacity>
          <Feather
            name="sun"
            size={ICON_SIZE}
            color={color}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={ICON_SIZE}
            color={color}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserHeading
