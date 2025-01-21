import { FONT_SIZE } from '@/constants/styling'
import { View, Text } from '@/components/themed'
import FormInput from '../form/FormInput'
import { EvilIcons } from '@expo/vector-icons'
import { useState } from 'react'
import Animated, { LinearTransition } from 'react-native-reanimated'
import ListTransaction from '../ListTransaction'
import { useThemeColor } from '@/hooks/useThemeColor'

const BORDER_RADIUS = 16

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

const renderItem = (item: ListTransaction) => (
  <ListTransaction
    {...item}
    handleOnPress={() => alert('Hello World')}
  />
)

const Transactions = () => {
  const [search, setSearch] = useState('')

  const color = useThemeColor({}, 'text')

  return (
    <View
      style={{
        flex: 1,
        borderTopLeftRadius: BORDER_RADIUS,
        borderTopRightRadius: BORDER_RADIUS,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      }}
      type="secondaryBackground"
    >
      <View
        style={{ paddingTop: 24, paddingHorizontal: 24, flex: 1 }}
        type="secondaryBackground"
      >
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: 14,
            alignItems: 'center',
          }}
          type="secondaryBackground"
        >
          <Text style={{ fontSize: FONT_SIZE.PARAGRAPH }}>
            Recent Transactions
          </Text>
          <Text style={{ fontSize: FONT_SIZE.CHIP }}>View All</Text>
        </View>

        <FormInput
          placeholder="Search"
          value={search}
          onChange={setSearch}
          clearable
          icon={
            <EvilIcons
              name="search"
              size={22}
              color={color}
            />
          }
        />
        <View
          style={{ marginTop: 10, flex: 1, paddingBottom: 20 }}
          type="secondaryBackground"
        >
          <Animated.FlatList
            data={fakeTransactions}
            renderItem={({ item }) => renderItem(item)}
            itemLayoutAnimation={LinearTransition}
            fadingEdgeLength={40}
          />
        </View>
      </View>
    </View>
  )
}

export default Transactions
