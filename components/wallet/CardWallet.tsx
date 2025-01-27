import { View, Text } from '@/components/themed'
import { Colors } from '@/constants/Colors'
import { FONT_SIZE } from '@/constants/styling'
import { Wallets } from '@/db/schema'
import { useWalletTheme } from '@/hooks/useThemeColor'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { DimensionValue, StyleSheet, TouchableOpacity } from 'react-native'
import { formatCurrency } from 'react-native-format-currency'
import { WalletContext } from './WalletContext'

interface CardWalletProps {
  theme: keyof typeof Colors.cards
  isActive?: boolean
  wallet: Wallets
  currency: string
  width?: DimensionValue
  showActive?: boolean
  activeId?: number | null
  onDelete?: () => void
  onUpdate?: () => void
  onSetActive?: () => void
}

const CardWallet = ({
  theme,
  wallet,
  onDelete,
  onUpdate,
  onSetActive,
  currency = 'USD',
  width = '100%',
  showActive = false,
  activeId, // If component is reused and want to set a different active wallet
}: CardWalletProps) => {
  const date = new Date(wallet.created_at!)
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: 'numeric',
    year: '2-digit',
  }).format(date)

  const themeData = useWalletTheme(theme)
  const [valueWithSymbol] = formatCurrency({
    amount: wallet.amount,
    code: currency,
  })

  const content = (
    <TouchableOpacity
      activeOpacity={0.65}
      onPress={onSetActive}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: themeData.background,
            justifyContent: 'space-between',
          },
          { width: width },
          showActive && (wallet.active_at ? styles.active : null),
          activeId === wallet.id ? styles.active : null,
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: themeData.background,
            alignItems: 'center',
          }}
        >
          <Feather
            name="home"
            size={20}
            color={themeData.text}
          />
          <Text
            style={{ color: themeData.text, fontSize: FONT_SIZE.DESCRIPTION }}
          >
            {formattedDate}
          </Text>
        </View>
        <View style={[{ backgroundColor: themeData.background }]}>
          <Text
            style={{
              color: themeData.secondary,
              fontSize: FONT_SIZE.DESCRIPTION,
            }}
          >
            Balance
          </Text>
          <Text
            style={{
              color: themeData.text,
              fontSize: FONT_SIZE.LG,
              fontWeight: '600',
              marginTop: 4,
            }}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {valueWithSymbol}
          </Text>
        </View>
        <Text
          style={{ color: themeData.text }}
          numberOfLines={1}
        >
          {wallet.wallet}
        </Text>
      </View>
    </TouchableOpacity>
  )

  if (onDelete && onUpdate && onSetActive) {
    return (
      <WalletContext
        isActive={!!wallet.active_at}
        onSetActive={onSetActive}
        onDelete={onDelete}
        onUpdate={onUpdate}
      >
        {content}
      </WalletContext>
    )
  } else {
    return content
  }
}

export default CardWallet

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 10,
    height: 200,
  },
  active: {
    borderWidth: 2,
    borderColor: 'white',
  },
})
