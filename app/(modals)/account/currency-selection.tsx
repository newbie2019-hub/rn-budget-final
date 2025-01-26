import FormInput from '@/components/form/FormInput'
import { Text, View } from '@/components/themed'
import { FONT_SIZE } from '@/constants/styling'
import { useThemeColor } from '@/hooks/useThemeColor'
import { EvilIcons } from '@expo/vector-icons'
import { useMemo, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import {
  formatCurrency,
  getSupportedCurrencies,
} from 'react-native-format-currency'

interface CurrencyCode {
  code: string
  name: string
}

const CurrencySelection = () => {
  const [inputValue, setInputValue] = useState('123')
  const [search, setSearch] = useState('')

  // get all of the supported currency codes
  const currencyCodes = getSupportedCurrencies()
  const color = useThemeColor({}, 'text')
  const textSecondary = useThemeColor({}, 'textSecondary')

  const filteredCurrency = useMemo(() => {
    return currencyCodes.filter((currency) => {
      return (
        currency.code.toLowerCase().includes(search.toLowerCase()) ||
        currency.name.toLowerCase().includes(search.toLowerCase())
      )
    })
  }, [search, currencyCodes])

  const renderItem = ({ item }: { item: CurrencyCode }) => {
    const [valWithSymbol, valWithoutSymbol, symbol] = formatCurrency({
      amount: Number(inputValue),
      code: item.code,
    })

    return (
      <TouchableOpacity activeOpacity={0.6}>
        <View style={styles.currencyRow}>
          <View style={{ justifyContent: 'space-between' }}>
            <Text style={{ fontSize: FONT_SIZE.PARAGRAPH }}>{item.code}</Text>
            <Text style={{ color: textSecondary }}>{item.name}</Text>
          </View>
          <Text> {symbol}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1 }}>
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
      <View style={{ padding: 20, flex: 1 }}>
        <Text
          style={{
            marginBottom: 14,
            fontSize: FONT_SIZE.PARAGRAPH,
            fontWeight: '600',
          }}
        >
          Select Currency
        </Text>
        <FormInput
          placeholder="Search"
          value={search}
          onChange={setSearch}
          clearable
          icon={
            <EvilIcons
              name="search"
              size={25}
              color={color}
            />
          }
        />
        <FlatList
          style={styles.scrollView}
          data={filteredCurrency}
          renderItem={renderItem}
          keyExtractor={(code) => code.code}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
        />
      </View>
    </View>
  )
}

export default CurrencySelection

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    marginTop: 14,
    marginBottom: 60,
  },
  currencyRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
})
