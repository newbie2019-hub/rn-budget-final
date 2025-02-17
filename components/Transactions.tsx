import { View, Text } from "@/components/themed";
import ListTransaction from "./ListTransaction";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TransactionsWithCategory } from "@/db/schema";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SectionList } from "react-native";
import { headingDate } from "@/lib/helpers";
import { useMutation } from "@tanstack/react-query";
import { useTransactions } from "@/hooks/useTransactions";

interface TransactionsByDate {
  date: string;
  data: TransactionsWithCategory[];
}

const Transactions = ({
  transactions,
  isLoading,
  removeTransaction,
}: {
  transactions?: TransactionsByDate[];
  isLoading?: boolean;
  removeTransaction: (id: number) => Promise<void>;
}) => {
  const textSecondary = useThemeColor({}, "textSecondary");

  // TODO: Create List Loading State
  if (isLoading) {
    return (
      <>
        <Text>Loading Transactions...</Text>
      </>
    );
  }

  return (
    <View style={{ flex: 0.5 }}>
      <View
        style={{
          paddingTop: 24,
          flex: 1,
        }}
      >
        {transactions?.length === 0 ? (
          <View
            style={{
              flex: 0.7,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: textSecondary }}>No transactions found</Text>
          </View>
        ) : (
          <View style={{ flex: 0.95 }}>
            <View
              style={{
                flex: 1,
                height: "100%",
              }}
            >
              <GestureHandlerRootView style={{ flex: 1 }}>
                <SectionList
                  sections={transactions!}
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <ListTransaction
                      transaction={item}
                      type="background"
                      onDelete={removeTransaction}
                      formatType="short"
                    />
                  )}
                  renderSectionHeader={({ section: { date } }) => (
                    <View
                      style={{ padding: 10, borderRadius: 4 }}
                      type="secondaryBackground"
                    >
                      <Text>{headingDate(date)}</Text>
                    </View>
                  )}
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
