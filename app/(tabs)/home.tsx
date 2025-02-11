import { SafeAreaView } from "react-native-safe-area-context";
import { UserHeading, Wallet, Transactions } from "@/components/home";
import { View } from "@/components/themed/index";
import { defaultStyles } from "@/constants/styling";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppStore } from "@/store/appStore";
import { useQuery } from "@tanstack/react-query";
import { useWallets } from "@/hooks/useWallets";

const Page = () => {
  const currency = useAppStore((state) => state.currency);
  const bgColor = useThemeColor({}, "background");

  const { getActiveWallet } = useWallets();

  const { data: wallet } = useQuery({
    queryKey: ["wallet"],
    queryFn: getActiveWallet,
  });

  console.log("Wallet: ", wallet);

  return (
    <SafeAreaView
      edges={["left", "top", "right"]}
      style={{ flex: 1, backgroundColor: bgColor }}
    >
      <View style={defaultStyles.container}>
        <UserHeading />
        <Wallet
          wallet={wallet}
          currency={currency}
          summary={{ income: 0, expense: 0 }}
        />
      </View>
      <Transactions transactions={wallet?.transactions} />
    </SafeAreaView>
  );
};

export default Page;
