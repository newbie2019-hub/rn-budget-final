import { View } from '@/components/themed'
import React from 'react'
import { wallets } from '@/constants/Wallet'
import { useWalletTheme } from '@/hooks/useThemeColor'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Colors } from '@/constants/Colors'

const SIZE = 24

const Selection = ({
  theme,
  isSelected,
  onSelect,
}: {
  theme: keyof typeof Colors.cards
  isSelected: boolean
  onSelect: (theme: keyof typeof Colors.cards) => void
}) => {
  const color = useWalletTheme(theme)

  return (
    <TouchableOpacity
      onPress={() => onSelect(theme)}
      style={[
        isSelected
          ? {
              borderColor: color.background,
              borderRadius: 50,
              borderWidth: 2,
              padding: 2,
            }
          : {},
      ]}
    >
      <View
        style={[
          {
            backgroundColor: color.background,
            borderRadius: 50,
            width: SIZE,
            height: SIZE,
            borderColor: 'white',
            borderWidth: 1,
          },
          isSelected ? { borderColor: color.background } : {},
        ]}
      ></View>
    </TouchableOpacity>
  )
}

const ThemePicker = ({
  theme,
  onSelect,
}: {
  theme: keyof typeof Colors.cards
  onSelect: (theme: keyof typeof Colors.cards) => void
}) => {
  return (
    <View>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 6, alignItems: 'center' }}
        showsHorizontalScrollIndicator={false}
      >
        {wallets?.map((wallet) => (
          <Selection
            key={wallet.value}
            theme={wallet.value as keyof typeof Colors.cards}
            isSelected={wallet.value === theme}
            onSelect={() => onSelect(wallet.value as keyof typeof Colors.cards)}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default ThemePicker
