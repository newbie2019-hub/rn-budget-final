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

const Wallet = () => {
  const queryClient = useQueryClient();
  const bgColor = useThemeColor({}, "background");

  const { getWallets } = useWallets();
  const { fetchTransactions, handleDelete, handleSetActive, handleUpdate } =
    useTransactions();

  const currency = useAppStore((state) => state.currency);

  const { data: transactions, isLoading: isTransactionsLoading } = useQuery({
    queryKey: ["all-transactions"],
    queryFn: fetchTransactions,
  });

  const { data: wallets, isLoading: isWalletsLoading } = useQuery({
    queryKey: ["wallets"],
    queryFn: getWallets,
  });

  const { mutateAsync: deleteWallet } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallets"],
      });
    },
  });

  const { mutateAsync: setActive } = useMutation({
    mutationFn: handleSetActive,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallets"],
      });
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: bgColor }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
        <View style={[defaultStyles.container]}>
          <Text style={{ fontSize: FONT_SIZE.HEADING }}>Wallets</Text>
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

          {!isWalletsLoading && wallets?.length > 0 && (
            <Button
              label="Add Wallet"
              onPress={() => router.push("/(modals)/add-wallet")}
            />
          )}
          {!isWalletsLoading && wallets?.length === 0 && (
            <View
              style={{
                height: "70%",
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
          <View style={{ flex: 1 }}>
            <Transactions transactions={transactions} title={"Transactions"} />
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Wallet;
