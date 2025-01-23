import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import { useLinkBuilder, useTheme } from '@react-navigation/native'
import { Text, PlatformPressable } from '@react-navigation/elements'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { Fragment, useState } from 'react'
import { BlurView } from 'expo-blur'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { useThemeColor } from '@/hooks/useThemeColor'

function TabBar({
  state,
  descriptors,
  navigation,
  showLabel = false,
}: BottomTabBarProps & { showLabel?: boolean }) {
  const { colors } = useTheme()
  const { buildHref } = useLinkBuilder()

  const shadowColor = useThemeColor({}, 'shadowColor')
  const borderColor = useThemeColor({}, 'navBorder')

  const [dimensions, setDimensions] = useState({ height: 20, width: 100 })

  const buttonWidth = dimensions.width / (state.routes.length + 1)

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    })
  }

  const tabPositionX = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    }
  })

  const getMultiplier = [0, 0.038, 0.82, 0.88]

  return (
    <View
      onLayout={onTabbarLayout}
      style={[
        style.tabBar,
        { shadowColor: shadowColor, borderColor: borderColor, borderWidth: 2 },
      ]}
    >
      <BlurView
        intensity={16}
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'transparent',
          borderRadius: 40,
          overflow: 'hidden',
        }}
      />
      <Animated.View
        style={[
          animatedStyle,
          {
            position: 'absolute',
            backgroundColor: colors.primary,
            borderRadius: 30,
            bottom: 10,
            height: 7,
            left: buttonWidth / 2,
            width: 7,
          },
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          tabPositionX.value = withSpring(
            buttonWidth * (index + getMultiplier[index]),
            {
              duration: 1500,
              stiffness: 200,
              reduceMotion: ReduceMotion.System,
            },
          )
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        const showNewTransaction = () => {
          router.push('/(modals)/new-transaction')
        }

        return (
          <Fragment key={route.name}>
            {index === 2 ? (
              <PlatformPressable
                style={{
                  padding: 12,
                  backgroundColor: colors.primary,
                  borderRadius: 50,
                }}
                onPress={showNewTransaction}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                accessibilityState={isFocused ? { selected: true } : {}}
              >
                <Feather
                  name="plus"
                  size={26}
                  color={'white'}
                />
              </PlatformPressable>
            ) : null}

            <PlatformPressable
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={style.tabBarItem}
            >
              {options.tabBarIcon!({
                focused: isFocused,
                color: isFocused ? colors.primary : Colors.light.inActive,
                size: 24,
              })}
              {showLabel ? (
                <Text
                  style={{
                    color: isFocused ? colors.primary : Colors.light.inActive,
                  }}
                >
                  {label as string}
                </Text>
              ) : null}
            </PlatformPressable>
          </Fragment>
        )
      })}
    </View>
  )
}

export default TabBar

const style = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '80%',
    left: 45,
    borderRadius: 40,
    paddingVertical: 10,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
})
