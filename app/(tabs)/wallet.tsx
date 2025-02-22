import { View, Text } from "@/components/themed";
import CardWallet from "@/components/wallet/CardWallet";
import { defaultStyles, FONT_SIZE } from "@/constants/styling";
import { useThemeColor } from "@/hooks/useThemeColor";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Link, router } from "expo-router";
import Animated, { LinearTransition } from "react-native-reanimated";
import Button from "@/components/Button";
import { useAppStore } from "@/store/appStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTransactions } from "@/hooks/useTransactions";
import Transactions from "@/components/Transactions";
import { useWallets } from "@/hooks/useWallets";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

const Wallet = () => {
  const queryClient = useQueryClient();
  const bgColor = useThemeColor({}, "background");
  const color = useThemeColor({}, "text");

  const { getWallets } = useWallets();
  const {
    getActiveWalletTransactions,
    handleDelete,
    handleSetActive,
    handleUpdate,
    deleteTransaction,
  } = useTransactions();

  const currency = useAppStore((state) => state.currency);

  const { data: transactions, isLoading: isTransactionsLoading } = useQuery({
    queryKey: ["all-transactions"],
    queryFn: async () => {
      const data = await getActiveWalletTransactions();

      return Object.values(
        data.reduce(
          (acc, transaction) => {
            const date = new Date(transaction.created_at!)
              .toISOString()
              .split("T")[0]; // Extract YYYY-MM-DD

            if (!acc[date]) {
              acc[date] = { date, data: [] };
            }

            acc[date].data.push(transaction);
            return acc;
          },
          {} as Record<string, { date: string; data: any[] }>,
        ),
      );
    },
  });

  const { data: wallets, isLoading: isWalletsLoading } = useQuery({
    queryKey: ["wallets"],
    queryFn: async () => {
      const wallets = await getWallets();
      return wallets.sort(
        (a, b) => (b.active_at ? 1 : 0) - (a.active_at ? 1 : 0),
      );
    },
  });

  const { mutateAsync: deleteWallet } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallet"],
      });
      queryClient.invalidateQueries({
        queryKey: ["wallets"],
      });
    },
  });

  const { mutateAsync: setActive } = useMutation({
    mutationFn: handleSetActive,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallet"],
      });
      queryClient.invalidateQueries({
        queryKey: ["wallets"],
      });
      queryClient.invalidateQueries({
        queryKey: ["all-transactions"],
      });
    },
  });

  const { mutateAsync: removeTransaction } = useMutation({
    mutationFn: deleteTransaction,
    mutationKey: ["delete-transaction"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["all-transactions"] });
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: bgColor }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
        <View style={[defaultStyles.container]}>
          <Text style={{ fontSize: FONT_SIZE.HEADING }}>Wallets</Text>

          {!isWalletsLoading && wallets && wallets?.length > 0 && (
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push("/(modals)/add-wallet")}
                style={{ height: "100%" }}
              >
                <View
                  style={{
                    height: 200,
                    width: 120,
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 14,
                    borderRadius: 10,
                  }}
                  type="secondaryBackground"
                >
                  <Ionicons name="wallet-outline" size={24} color={color} />
                  <Text
                    style={{ marginTop: 4, fontSize: FONT_SIZE.DESCRIPTION }}
                  >
                    Add Wallet
                  </Text>
                </View>
              </TouchableOpacity>
              <Animated.FlatList
                data={wallets}
                renderItem={({ item }) => (
                  <CardWallet
                    key={item.id}
                    theme={item.theme as keyof typeof Colors.cards}
                    wallet={item}
                    onDelete={() => deleteWallet(item.id)}
                    onUpdate={handleUpdate}
                    onSetActive={() => setActive(item.id)}
                    currency={currency}
                    width={160}
                    showActive
                  />
                )}
                horizontal={true}
                contentContainerStyle={{ gap: 8, marginVertical: 14 }}
                showsHorizontalScrollIndicator={false}
                itemLayoutAnimation={LinearTransition}
              />
            </View>
          )}

          {!isWalletsLoading && wallets && wallets?.length > 0 && (
            <View style={{ height: "100%" }}>
              <Transactions
                isLoading={isTransactionsLoading}
                transactions={transactions}
                removeTransaction={removeTransaction}
              />
            </View>
          )}

          {!isWalletsLoading && wallets?.length === 0 && (
            <View
              style={{
                height: "95%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link href={"/(modals)/add-wallet"}>
                <Text style={{ color: "#4c8df5" }}>Add Wallet</Text>
              </Link>
              <Text style={{ marginTop: 12 }}>No Wallet Added</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Wallet;
