import { useThemeColor } from '@/hooks/useThemeColor'
import { TouchableOpacity } from 'react-native'
import { Text, View } from '../themed'

const ListOption = ({
  label,
  onClick,
  value,
  renderItem,
}: {
  label: string
  onClick: () => void
  value: string
  renderItem: () => void
}) => {
  const secondaryBg = useThemeColor({}, 'secondaryBackground')

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{ padding: 16, backgroundColor: secondaryBg, borderRadius: 10 }}
      onPress={onClick}
    >
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: secondaryBg,
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontWeight: '500' }}>{label}</Text>
        <Text>{value}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ListOption
