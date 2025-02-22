import { ReactNode, useMemo, useState } from "react";
import { Categories } from "@/db/schema";
import { Text, View } from "../themed";
import { FONT_SIZE } from "@/constants/styling";
import FormInput from "../form/FormInput";
import { AntDesign, EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { getIcon } from "@/lib/helpers/getIcon";
import * as DropdownMenu from "zeego/dropdown-menu";

const getIconComponent = ({
  icon,
  iconType,
  size,
  color,
}: {
  icon: string;
  iconType: string;
  size: number;
  color: string;
}) => {
  const iconComponent = getIcon({ icon, iconType, size, color });

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 18,
        height: 18,
      }}
    >
      {iconComponent}
    </View>
  );
};

const DropDownOptions = (
  trigger: ReactNode,
  filter: string,
  setFilter: React.Dispatch<React.SetStateAction<string>>,
  color: string,
) => {
  const options = [
    {
      key: "income",
      label: "Income",
      value: "income",
    },
    {
      key: "expense",
      label: "Expense",
      value: "expense",
    },
    {
      key: "all-categories",
      label: "All Categories",
      value: "all-categories",
    },
  ];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {options.map((opt) => (
          <DropdownMenu.Item
            key={opt.key}
            onSelect={() => setFilter(opt.value)}
          >
            <DropdownMenu.ItemTitle>{opt.label}</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const CategoryList = ({
  selectedCategory,
  categories,
  onPress,
  isLoading,
}: {
  selectedCategory: number | null;
  categories: Categories[] | undefined;
  onPress: (category: Categories) => void;
  isLoading: boolean;
}) => {
  const color = useThemeColor({}, "text");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filteredCategories = useMemo(() => {
    return categories?.filter((categ) => {
      const matchesSearch = categ.category
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        filter === "all-categories" ||
        filter === "" ||
        categ.type.toLowerCase() === filter.toLowerCase();

      return matchesSearch && matchesType;
    });
  }, [search, categories, filter]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ marginBottom: 5 }}>
        <FormInput
          placeholder="Search Category"
          value={search}
          onChange={setSearch}
          clearable
          icon={<EvilIcons name="search" size={25} color={color} />}
          trailingIcon={DropDownOptions(
            <Ionicons name="filter-circle" size={24} color={color} />,
            filter,
            setFilter,
            color,
          )}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 5 }}
      >
        {filteredCategories?.map((categ) => (
          <TouchableOpacity
            key={categ.id}
            style={styles.categoryList}
            onPress={() => onPress(categ)}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 14,
                  flex: 1,
                  paddingLeft: 4,
                }}
              >
                {getIconComponent({
                  icon: categ.icon!,
                  iconType: categ.iconType!,
                  size: 20,
                  color: color,
                })}
                <Text
                  style={[
                    { fontSize: FONT_SIZE.BASE },
                    categ.id === selectedCategory ? { fontWeight: "500" } : {},
                  ]}
                >
                  {categ.category}
                </Text>
              </View>
              {categ.id === selectedCategory && (
                <Feather name="check" size={24} color="#1bab3d" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  categoryList: {
    paddingVertical: 8,
  },
});
