import { FONT_SIZE } from '@/constants/styling'
import { View, Text } from '@/components/themed'
import FormInput from '../form/FormInput'
import { EvilIcons } from '@expo/vector-icons'
import { useState } from 'react'
import Animated, { LinearTransition } from 'react-native-reanimated'
import ListTransaction from '../ListTransaction'
import { useThemeColor } from '@/hooks/useThemeColor'
import { TransactionsWithCategory } from '@/db/schema'

const BORDER_RADIUS = 14

const renderItem = (transaction: TransactionsWithCategory) => (
  <ListTransaction
    transaction={transaction}
    handleOnPress={() => alert('Hello World')}
  />
)

const Transactions = ({
  transactions,
}: {
  transactions: TransactionsWithCategory[]
}) => {
  const [search, setSearch] = useState('')

  const color = useThemeColor({}, 'text')
  const bgColor = useThemeColor({}, 'background')
  const shadowColor = useThemeColor({}, 'shadowColor')
  const textSecondary = useThemeColor({}, 'textSecondary')

  return (
    <View
      style={{
        flex: 1,
        borderTopLeftRadius: BORDER_RADIUS,
        borderTopRightRadius: BORDER_RADIUS,
        shadowColor: shadowColor,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.22,
        elevation: 3,
      }}
      type="secondaryBackground"
    >
      <View
        style={{
          paddingTop: 24,
          paddingHorizontal: 24,
          flex: 1,
          borderTopLeftRadius: BORDER_RADIUS,
          borderTopRightRadius: BORDER_RADIUS,
        }}
        type="secondaryBackground"
      >
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: 12,
            alignItems: 'center',
          }}
          type="secondaryBackground"
        >
          <Text style={{ fontSize: FONT_SIZE.PARAGRAPH }}>
            Recent Transactions
          </Text>
          <Text style={{ fontSize: FONT_SIZE.CHIP }}>View All</Text>
        </View>

        {transactions.length === 0 ? (
          <View
            style={{
              flex: 0.7,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            type="secondaryBackground"
          >
            <Text style={{ color: textSecondary }}>No transactions found</Text>
          </View>
        ) : (
          <View
            style={{ flex: 0.7 }}
            type="secondaryBackground"
          >
            <FormInput
              placeholder="Search"
              value={search}
              onChange={setSearch}
              clearable
              backgroundColor={bgColor}
              icon={
                <EvilIcons
                  name="search"
                  size={25}
                  color={color}
                />
              }
            />
            <View
              style={{ marginTop: 10, flex: 1, paddingBottom: 20 }}
              type="secondaryBackground"
            >
              <Animated.FlatList
                data={transactions}
                renderItem={({ item }) => renderItem(item)}
                itemLayoutAnimation={LinearTransition}
                fadingEdgeLength={40}
                showsVerticalScrollIndicator={false}
                keyboardDismissMode={'on-drag'}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

export default Transactions
