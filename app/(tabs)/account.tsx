import { Text, View } from '@/components/themed'
import { defaultStyles, FONT_SIZE } from '@/constants/styling'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useRouter } from 'expo-router'
import { ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Option = ({
  label,
  onClick,
  value,
}: {
  label: string
  onClick: () => void
  value: unknown
}) => {
  const secondaryBg = useThemeColor({}, 'secondaryBackground')

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{ padding: 16, backgroundColor: secondaryBg, borderRadius: 10 }}
      onPress={onClick}
    >
      <View style={{ flexDirection: 'row', backgroundColor: secondaryBg }}>
        <Text style={{ fontWeight: '500' }}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}

const Account = () => {
  const bgColor = useThemeColor({}, 'background')
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[defaultStyles.container]}>
          <Text style={{ fontSize: FONT_SIZE.HEADING }}>Settings</Text>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: FONT_SIZE.PARAGRAPH, fontWeight: '500' }}>
              Account Settings
            </Text>
            <View style={{ gap: 8, marginTop: 10 }}>
              <Option
                label="Name"
                value=""
                onClick={() => alert('hi')}
              />
              <Option
                label="Email"
                value=""
                onClick={() => alert('hi')}
              />
              <Option
                label="Change Password"
                value=""
                onClick={() => alert('hi')}
              />
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: FONT_SIZE.PARAGRAPH, fontWeight: '500' }}>
              App Settings
            </Text>
            <View style={{ gap: 8, marginTop: 10 }}>
              <Option
                label="Currency"
                value="USD"
                onClick={() => alert('hi')}
              />
              <Option
                label="Reminder Notification"
                value=""
                onClick={() => router.push('/(modals)/reminders')}
              />
              <Option
                label="Backup & Sync Data"
                value=""
                onClick={() => alert('hi')}
              />
              <Option
                label="Reset Data"
                value=""
                onClick={() => alert('hi')}
              />
            </View>
          </View>
          <View style={{ marginTop: 30, paddingBottom: 60 }}>
            <Text style={{ fontSize: FONT_SIZE.PARAGRAPH, fontWeight: '500' }}>
              App Support
            </Text>
            <View style={{ gap: 8, marginTop: 10 }}>
              <Option
                label="Feedback"
                value=""
                onClick={() => alert('hi')}
              />
              <Option
                label="Feature Request"
                value=""
                onClick={() => alert('hi')}
              />
              <Option
                label="About Kaperas"
                value=""
                onClick={() => router.push('/(modals)/about')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Account
