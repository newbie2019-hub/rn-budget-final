import { Stack } from 'expo-router'
import { useThemeColor } from '@/hooks/useThemeColor'

export default function RootLayout() {
  const background = useThemeColor({}, 'background')

  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: background } }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="about"
        options={{ title: 'About' }}
      />
      <Stack.Screen
        name="index"
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="(modals)/new-transaction"
        options={{
          title: 'New Transaction',
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="(modals)/change-wallet"
        options={{
          title: 'Select Wallet',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="(modals)/category"
        options={{
          title: 'Categories',
          presentation: 'modal',
        }}
      />
    </Stack>
  )
}
