import { FONT_SIZE } from '@/constants/styling'
import { View, Text } from '@/components/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeColor } from '@/hooks/useThemeColor'
import Preview from '@/components/reminder/Preview'
import { ScrollView } from 'react-native'
import SelectableList from '@/components/SelectableList'
import LottieView from 'lottie-react-native'
import { useState } from 'react'

const Reminders = () => {
  const textSecondary = useThemeColor({}, 'textSecondary')

  const [notification, setNotification] = useState('')

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: 5,
          backgroundColor: 'gray',
          width: 40,
          borderRadius: 20,
          marginTop: 10,
          marginHorizontal: 'auto',
        }}
      ></View>
      <ScrollView>
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: FONT_SIZE.TITLE,
              fontWeight: 600,
            }}
          >
            Send Notifications
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: FONT_SIZE.DESCRIPTION,
              width: '80%',
              marginHorizontal: 'auto',
              color: textSecondary,
              marginTop: 6,
            }}
          >
            Being reminded keeps you on track, ensuring you stay focused on your
            your finances effectively.
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
          <View style={{ gap: 10 }}>
            <SelectableList
              title="Don't send"
              description="Turn off all reminders"
              onPress={() => setNotification('no-notification')}
              isSelected={notification === 'no-notification'}
              renderItem={
                <LottieView
                  source={require('../../assets/images/icons/no-notif.json')}
                  style={{ height: 30, width: 30 }}
                  autoPlay
                  loop
                />
              }
            />
            <SelectableList
              title="Daily notifications"
              description="Get a reminder to add your transactions for a day"
              onPress={() => setNotification('daily-notification')}
              isSelected={notification === 'daily-notification'}
              renderItem={
                <LottieView
                  source={require('../../assets/images/icons/daily-notif.json')}
                  style={{ height: 30, width: 30 }}
                  autoPlay
                  loop
                />
              }
            />
            <SelectableList
              title="Weekly notifications"
              description="Get a reminder review your transactions for the week"
              onPress={() => setNotification('weekly-notification')}
              isSelected={notification === 'weekly-notification'}
              renderItem={
                <LottieView
                  source={require('../../assets/images/icons/weekly-notif.json')}
                  style={{ height: 30, width: 30 }}
                  autoPlay
                  loop
                />
              }
            />
          </View>
          <View style={{ marginTop: 50 }}>
            <Text style={{ marginBottom: 10 }}>Preview</Text>
            <Preview />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Reminders
