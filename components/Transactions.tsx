import { FONT_SIZE } from "@/constants/styling";
import { View, Text } from "@/components/themed";
import FormInput from "./form/FormInput";
import { EvilIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import Animated, { LinearTransition } from "react-native-reanimated";
import ListTransaction from "./ListTransaction";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TransactionsWithCategory } from "@/db/schema";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Transactions = ({
  transactions,
  title,
}: {
  transactions: TransactionsWithCategory[];
  title: string;
}) => {
  const [search, setSearch] = useState("");

  const color = useThemeColor({}, "text");
  const bgColor = useThemeColor({}, "background");
  const shadowColor = useThemeColor({}, "shadowColor");
  const textSecondary = useThemeColor({}, "textSecondary");

  const filteredTransactions = useMemo(() => {
    // Allow search for category or amount
    return transactions?.filter((transaction) => {
      return (
        transaction.category?.category
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        transaction.amount
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [transactions, search]);

  return (
    <View style={{ flex: 1 }} type="secondaryBackground">
      <View
        style={{
          paddingTop: 24,
          flex: 1,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: FONT_SIZE.PARAGRAPH }}>Hello</Text>
          <Text style={{ fontSize: FONT_SIZE.CHIP }}>View All</Text>
        </View>
        <Text>Transactions: {JSON.stringify(transactions)}</Text>
        {transactions?.length === 0 ? (
          <View
            style={{
              flex: 0.7,
              alignItems: "center",
              justifyContent: "center",
            }}
            type="secondaryBackground"
          >
            <Text style={{ color: textSecondary }}>No transactions found</Text>
          </View>
        ) : (
          <View style={{ flex: 0.95 }} type="secondaryBackground">
            <FormInput
              placeholder="Search"
              value={search}
              onChange={setSearch}
              clearable
              backgroundColor={bgColor}
              icon={<EvilIcons name="search" size={25} color={color} />}
            />
            <View
              style={{
                marginTop: 10,
                flex: 1,
                height: "100%",
              }}
              type="secondaryBackground"
            >
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Animated.FlatList
                  data={filteredTransactions}
                  renderItem={({ item }) => (
                    <ListTransaction transaction={item} />
                  )}
                  itemLayoutAnimation={LinearTransition}
                  fadingEdgeLength={20}
                  showsVerticalScrollIndicator={false}
                  keyboardDismissMode={"on-drag"}
                />
              </GestureHandlerRootView>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Transactions;
