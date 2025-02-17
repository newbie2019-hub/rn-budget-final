import { Text, View } from '@/components/themed'
import { defaultStyles } from '@/constants/styling'

const ExpenseAnalytics = () => {
  return (
    <View style={[defaultStyles.container, { flex: 1 }]}>
      <Text>Expense Section</Text>
    </View>
  )
}

export default ExpenseAnalytics
