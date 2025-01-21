import { View, Text, TouchableOpacity } from 'react-native'
import { categories } from '@/lib/dummy-data'
import { FONT_SIZE } from '@/constants/styling'

const Category = () => {
  return (
    <View>
      {categories.map((categ) => (
        <View key={categ.id}>
          <Text style={{ fontSize: FONT_SIZE.PARAGRAPH }}>
            {categ.category}
          </Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            {categ.categories.length > 0 ? (
              categ.categories.map((sub) => (
                <TouchableOpacity key={sub.id}>
                  <Text>{sub.category}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View>
                <Text>No Categories Available</Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  )
}

export default Category
