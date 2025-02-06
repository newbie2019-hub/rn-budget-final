import ListOption from '@/components/account/ListOption'
import { Text, View } from '@/components/themed'
import { defaultStyles, FONT_SIZE } from '@/constants/styling'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useAppStore } from '@/store/appStore'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Account = () => {
  const currency = useAppStore((state) => state.currency)

  const bgColor = useThemeColor({}, 'background')
  const router = useRouter()

  const [showResetModal, setShowResetModal] = useState(false)

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
              <ListOption
                label="Name"
                value=""
                onClick={() => alert('hi')}
              />
              <ListOption
                label="Email"
                value=""
                onClick={() => alert('hi')}
              />
              <ListOption
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
              <ListOption
                label="Currency"
                value={currency}
                onClick={() =>
                  router.push('/(modals)/account/currency-selection')
                }
              />
              <ListOption
                label="Categories"
                value={currency}
                onClick={() =>
                  router.push('/(modals)/account/currency-selection')
                }
              />
              <ListOption
                label="Reminder Notification"
                value=""
                onClick={() => router.push('/(modals)/reminders')}
              />
              <ListOption
                label="Backup & Sync Data"
                value=""
                onClick={() => alert('hi')}
              />
              <ListOption
                label="Reset Data"
                value=""
                onClick={() => setShowResetModal(true)}
              />
              <ListOption
                label="App Lock"
                value=""
                onClick={() => alert('App Lock')}
              />
            </View>
          </View>
          <View style={{ marginTop: 30, paddingBottom: 60 }}>
            <Text style={{ fontSize: FONT_SIZE.PARAGRAPH, fontWeight: '500' }}>
              App Support
            </Text>
            <View style={{ gap: 8, marginTop: 10 }}>
              <ListOption
                label="Feedback"
                value=""
                onClick={() => router.push('/(modals)/support/feedback')}
              />
              <ListOption
                label="Feature Request"
                value=""
                onClick={() => router.push('/(modals)/support/feature-request')}
              />
              <ListOption
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
