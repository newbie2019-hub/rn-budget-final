import { withLayoutContext } from 'expo-router'

import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs'
import { ParamListBase, TabNavigationState } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Text, View } from '@/components/themed'
import { defaultStyles, FONT_SIZE } from '@/constants/styling'

import AntDesign from '@expo/vector-icons/AntDesign'

const { Navigator } = createMaterialTopTabNavigator()

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator)

const TabLayout = () => {
  const bgColor = useThemeColor({}, 'background')
  const text = useThemeColor({}, 'text')

  return (
    <SafeAreaView
      edges={['left', 'top', 'right']}
      style={{ flex: 1, backgroundColor: bgColor }}
    >
      <View
        style={[
          defaultStyles.container,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}
      >
        <Text style={{ fontSize: FONT_SIZE.HEADING }}>Analytics</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Text style={{ fontSize: FONT_SIZE.PARAGRAPH }}>December</Text>
          <AntDesign
            name="filter"
            size={16}
            color={text}
          />
        </View>
      </View>
      <MaterialTopTabs
        screenOptions={{
          tabBarStyle: { backgroundColor: bgColor },
          tabBarLabelStyle: { color: text, textTransform: 'capitalize' },
        }}
      ></MaterialTopTabs>
    </SafeAreaView>
  )
}

export default TabLayout
