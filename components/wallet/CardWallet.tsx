import { View, Text } from '@/components/themed'
import { Colors } from '@/constants/Colors'
import { FONT_SIZE } from '@/constants/styling'
import { Wallets } from '@/db/schema'
import { useWalletTheme } from '@/hooks/useThemeColor'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet } from 'react-native'
import { formatCurrency } from 'react-native-format-currency'
import { WalletContext } from './WalletContext'

interface CardWalletProps {
  theme: keyof typeof Colors.cards
  isActive?: boolean
  wallet: Wallets
}

const CardWallet = ({ theme, isActive, wallet }: CardWalletProps) => {
  const date = new Date(wallet.created_at!)
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: 'numeric',
    year: '2-digit',
  }).format(date)

  const themeData = useWalletTheme(theme)
  const [valueWithSymbol] = formatCurrency({
    amount: wallet.amount,
    code: 'USD',
  })

  return (
    <WalletContext>
      <View
        style={[
          styles.card,
          {
            backgroundColor: themeData.background,
            justifyContent: 'space-between',
          },
          isActive ? styles.active : null,
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
    </WalletContext>
  )
}

export default CardWallet

const styles = StyleSheet.create({
  card: {
    padding: 16,
    width: 160,
    borderRadius: 10,
    height: 190,
  },
  active: {
    borderWidth: 2,
    borderColor: 'white',
  },
})
