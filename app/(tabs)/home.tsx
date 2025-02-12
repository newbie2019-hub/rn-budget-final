import { SafeAreaView } from "react-native-safe-area-context";
import { UserHeading, Wallet, Transactions } from "@/components/home";
import { View } from "@/components/themed/index";
import { defaultStyles } from "@/constants/styling";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppStore } from "@/store/appStore";
import { useQuery } from "@tanstack/react-query";
import { useWallets } from "@/hooks/useWallets";
import { useTransactions } from "@/hooks/useTransactions";

const Page = () => {
  const currency = useAppStore((state) => state.currency);
  const bgColor = useThemeColor({}, "background");

  const { getActiveWallet } = useWallets();
  const { getWalletSummary } = useTransactions();

  const { data: wallet } = useQuery({
    queryKey: ["wallet"],
    queryFn: getActiveWallet,
  });

  const walletId = wallet?.id;

  const { data: summary } = useQuery({
    queryKey: ["wallet-summary", walletId],
    queryFn: async () => await getWalletSummary(walletId),
    enabled: walletId !== undefined,
  });

  return (
    <SafeAreaView
      edges={["left", "top", "right"]}
      style={{ flex: 1, backgroundColor: bgColor }}
    >
      <View style={defaultStyles.container}>
        <UserHeading />
        <Wallet wallet={wallet} currency={currency} summary={summary} />
      </View>
      <Transactions transactions={wallet?.transactions} />
    </SafeAreaView>
  );
};

export default Page;
