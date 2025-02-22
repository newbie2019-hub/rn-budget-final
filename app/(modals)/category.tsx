import CategoryList from "@/components/category/CategoryList";
import { Text, View } from "@/components/themed";
import { useCategories } from "@/hooks/useCategories";
import { useQuery } from "@tanstack/react-query";
import { TouchableOpacity } from "react-native";

const Category = () => {
  const { getCategories } = useCategories();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingTop: 20,
        }}
      >
        <Text>Manage Categories</Text>
        <TouchableOpacity>
          <Text>New Category</Text>
        </TouchableOpacity>
      </View>
      <CategoryList categories={categories} />
    </View>
  );
};

export default Category;
