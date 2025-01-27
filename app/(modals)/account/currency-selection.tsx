import FormInput from '@/components/form/FormInput'
import { Text, View } from '@/components/themed'
import { FONT_SIZE } from '@/constants/styling'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useAppStore } from '@/store/appStore'
import { EvilIcons, Feather } from '@expo/vector-icons'
import { useMemo, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import {
  formatCurrency,
  getSupportedCurrencies,
} from 'react-native-format-currency'
import Animated, { LinearTransition } from 'react-native-reanimated'

interface CurrencyCode {
  code: string
  name: string
}

const CurrencySelection = () => {
  const currency = useAppStore((state) => state.currency)
  const setCurrency = useAppStore((state) => state.setCurrency)

  const [inputValue] = useState('1')
  const [search, setSearch] = useState('')

  // get all of the supported currency codes
  const currencyCodes = getSupportedCurrencies()
  const color = useThemeColor({}, 'text')
  const textSecondary = useThemeColor({}, 'textSecondary')

  const filteredCurrency = useMemo(() => {
    // Filter currencies based on the search term
    const filtered = currencyCodes.filter((currency) => {
      return (
        currency.code.toLowerCase().includes(search.toLowerCase()) ||
        currency.name.toLowerCase().includes(search.toLowerCase())
      )
    })

    // Sort the filtered list and move the selected currency to the top
    return filtered.sort((a, b) => {
      if (a.code === currency) return -1 // Selected currency comes first
      if (b.code === currency) return 1
      return a.name.localeCompare(b.name) // Sort alphabetically by name
    })
  }, [search, currencyCodes, currency])

  const renderItem = ({ item }: { item: CurrencyCode }) => {
    const [valWithSymbol, valWithoutSymbol, symbol] = formatCurrency({
      amount: Number(inputValue),
      code: item.code,
    })

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setCurrency(item.code)}
      >
        <View style={styles.currencyRow}>
          <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
            <View
              style={{
                width: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>{symbol}</Text>
            </View>
            <View style={{ justifyContent: 'space-between' }}>
              <Text style={{ fontSize: FONT_SIZE.PARAGRAPH }}>{item.code}</Text>
              <Text style={{ color: textSecondary }}>{item.name}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            {currency === item.code ? (
              <Feather
                name="check"
                size={24}
                color="#1bab3d"
              />
            ) : null}
          </View>
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
        <Animated.FlatList
          style={styles.scrollView}
          data={filteredCurrency}
          renderItem={renderItem}
          keyExtractor={(code) => code.code}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          itemLayoutAnimation={LinearTransition}
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
    marginBottom: 50,
  },
  currencyRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
})
