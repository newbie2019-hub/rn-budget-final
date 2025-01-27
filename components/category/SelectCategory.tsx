import { useMemo, useState } from 'react'
import { Categories } from '@/db/schema'
import { Text, View } from '../themed'
import { FONT_SIZE } from '@/constants/styling'
import FormInput from '../form/FormInput'
import { EvilIcons, Feather } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

const SelectCategory = ({
  selectedCategory,
  categories,
  onPress,
}: {
  selectedCategory: number | null
  categories: Categories[]
  onPress: (category: Categories) => void
}) => {
  const color = useThemeColor({}, 'text')

  const [search, setSearch] = useState('')

  const filteredCategories = useMemo(() => {
    return categories.filter((categ) =>
      categ.category.toLowerCase().includes(search.toLowerCase()),
    )
  }, [search, categories])

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: FONT_SIZE.PARAGRAPH,
          fontWeight: '600',
          marginBottom: 12,
        }}
      >
        Select Category
      </Text>
      <View style={{ marginBottom: 20 }}>
        <FormInput
          placeholder="Search Category"
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
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredCategories.map((categ) => (
          <TouchableOpacity
            key={categ.id}
            style={styles.categoryList}
            onPress={() => onPress(categ)}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={[
                  categ.id === selectedCategory ? { fontWeight: '500' } : {},
                ]}
              >
                {categ.category}
              </Text>
              {categ.id === selectedCategory && (
                <Feather
                  name="check"
                  size={24}
                  color="#1bab3d"
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default SelectCategory

const styles = StyleSheet.create({
  categoryList: {
    paddingVertical: 8,
  },
})
