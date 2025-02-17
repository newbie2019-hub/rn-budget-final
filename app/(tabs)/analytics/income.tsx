import { Text, View } from '@/components/themed'
import { defaultStyles } from '@/constants/styling'

const Income = () => {
  return (
    <View style={[defaultStyles.container, { flex: 1 }]}>
      <Text>Income Section</Text>
    </View>
  )
}

export default Income
