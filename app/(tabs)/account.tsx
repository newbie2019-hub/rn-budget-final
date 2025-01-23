import { Text } from '@/components/themed'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const Account = () => {
  const bgColor = useThemeColor({}, 'background')

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <Text>Account</Text>
      <Link href="/(modals)/reminders">
        <Text>Reminders</Text>
      </Link>
    </SafeAreaView>
  )
}

export default Account
