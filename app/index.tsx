import { Link } from 'expo-router'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import type { Categories } from '@/db/schema'
import { useSQLiteContext } from 'expo-sqlite'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import * as schema from '@/db/schema'

export default function Index() {
  const [transactionCategories, setTransactionCategories] = useState<
    Categories[]
  >([])

  const db = useSQLiteContext()
  const drizzleDb = drizzle(db, { schema })

  useEffect(() => {
    const getCategories = async () => {
      const data = await drizzleDb.query.categories.findMany()
      console.log('🚀 ~ Categories ~ ', data)
      setTransactionCategories(data)
    }
    getCategories()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {transactionCategories.map((categ) => (
        <Text key={categ.id}>
          {categ.id}
          {categ.category}
        </Text>
      ))}
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link
        href="/home"
        replace
      >
        Go to About screen
      </Link>
    </View>
  )
}
