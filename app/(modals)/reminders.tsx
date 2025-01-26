import { FONT_SIZE } from '@/constants/styling'
import { View, Text } from '@/components/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeColor } from '@/hooks/useThemeColor'
import Preview from '@/components/reminder/Preview'
import { Platform, ScrollView } from 'react-native'
import SelectableList from '@/components/SelectableList'
import LottieView from 'lottie-react-native'
import { useEffect, useRef, useState } from 'react'
import * as Notifications from 'expo-notifications'
import {
  schedulePushNotification,
  registerForPushNotificationsAsync,
} from '@/lib/push-notification'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

const Reminders = () => {
  const textSecondary = useThemeColor({}, 'textSecondary')

  const [notificationType, setNotificationType] = useState('')

  // Notification
  const [expoPushToken, setExpoPushToken] = useState('')
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    [],
  )
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined)
  const notificationListener = useRef<Notifications.EventSubscription>()
  const responseListener = useRef<Notifications.EventSubscription>()

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token),
    )

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? []),
      )
    }
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response)
      })

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        )
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

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
        <View style={{ paddingHorizontal: 20, marginTop: 60 }}>
          <Text style={{ marginBottom: 10 }}>Select Notification</Text>
          <View style={{ gap: 10 }}>
            <SelectableList
              title="Don't send"
              description="Turn off all reminders"
              onPress={async () => {
                setNotificationType('no-notification')
                await schedulePushNotification()
              }}
              isSelected={notificationType === 'no-notification'}
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
              onPress={() => setNotificationType('daily-notification')}
              isSelected={notificationType === 'daily-notification'}
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
              onPress={() => setNotificationType('weekly-notification')}
              isSelected={notificationType === 'weekly-notification'}
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
          <View style={{ marginTop: 70 }}>
            <Text style={{ marginBottom: 10 }}>Preview</Text>
            <Preview />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Reminders
