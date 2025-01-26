import { FONT_SIZE } from '@/constants/styling'
import { View, Text } from '@/components/themed'
import FormInput from '../form/FormInput'
import { EvilIcons } from '@expo/vector-icons'
import { useState } from 'react'
import Animated, { LinearTransition } from 'react-native-reanimated'
import ListTransaction from '../ListTransaction'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Transactions as TransactionType } from '@/db/schema'

const BORDER_RADIUS = 14

const fakeTransactions = [
  {
    category: 'Health Care',
    createdAt: 'Today, 4:30 PM',
    amount: 450,
    type: 'Expense',
  },
  {
    category: 'Internet Bill',
    createdAt: 'Yesterday, 4:30 PM',
    amount: 3050,
    type: 'Expense',
  },
  {
    category: 'Salary',
    createdAt: 'Today, 2:30 PM',
    amount: 4500,
    type: 'Income',
  },
  {
    category: 'Dental Checkup',
    createdAt: 'Yesterday, 10:30 AM',
    amount: 250,
    type: 'Expense',
  },
  {
    category: 'Netflix Subscription',
    createdAt: 'Yesterday, 2:30 PM',
    amount: 10,
    type: 'Expense',
  },
  {
    category: 'Spotify Subscription',
    createdAt: 'Yesterday, 10:30 AM',
    amount: 20,
    type: 'Expense',
  },
  {
    category: 'Mortgage Payment',
    createdAt: 'Yesterday, 10:30 AM',
    amount: 2500,
    type: 'Expense',
  },
  {
    category: 'Monthly Allowance',
    createdAt: 'Today, 8:30 AM',
    amount: 3000,
    type: 'Expense',
  },
  {
    category: 'Internet Bill',
    createdAt: 'Yesterday, 4:30 PM',
    amount: 3050,
    type: 'Expense',
  },
  {
    category: 'Salary',
    createdAt: 'Today, 2:30 PM',
    amount: 4500,
    type: 'Income',
  },
  {
    category: 'Internet Bill',
    createdAt: 'Yesterday, 4:30 PM',
    amount: 3050,
    type: 'Expense',
  },
  {
    category: 'Salary',
    createdAt: 'Today, 2:30 PM',
    amount: 4500,
    type: 'Income',
  },
  {
    category: 'Internet Bill',
    createdAt: 'Yesterday, 4:30 PM',
    amount: 3050,
    type: 'Expense',
  },
  {
    category: 'Salary',
    createdAt: 'Today, 2:30 PM',
    amount: 4500,
    type: 'Income',
  },
]

const renderItem = (transaction: TransactionType) => (
  <ListTransaction
    transaction={transaction}
    handleOnPress={() => alert('Hello World')}
  />
)

const Transactions = ({
  transactions,
}: {
  transactions: TransactionType[]
}) => {
  const [search, setSearch] = useState('')

  const color = useThemeColor({}, 'text')
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
          <View>
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
