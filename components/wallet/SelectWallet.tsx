import { Dimensions } from "react-native";
import React from "react";
import CardWallet from "./CardWallet";
import { FONT_SIZE } from "@/constants/styling";
import { Colors } from "@/constants/Colors";
import { useAppStore } from "@/store/appStore";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Text, View } from "../themed";
import { Link } from "expo-router";
import { Wallets } from "@/db/schema";

const SelectWallet = ({
  onPress,
  wallets,
  selectedWalletId,
}: {
  onPress: (walletId: number, walletName: string) => void;
  wallets: Wallets[];
  selectedWalletId: number | null;
}) => {
  const currency = useAppStore((state) => state.currency);

  // Get device width to determine layout
  const deviceWidth = Dimensions.get("window").width;
  // Adjust number of columns dynamically
  const numColumns = deviceWidth < 400 ? 1 : 2; // 1 column for smaller devices, 2 for larger
  const tileSize = deviceWidth / numColumns - 24; // Subtract padding

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: FONT_SIZE.PARAGRAPH,
            fontWeight: "600",
            marginBottom: 12,
          }}
        >
          Select Wallet
        </Text>
        {wallets.length === 0 ? (
          <View
            style={{
              height: "70%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link href="/(tabs)/wallet" replace>
              <Text style={{ color: "#4c8df5" }}>Add Wallet</Text>
            </Link>
            <Text style={{ marginTop: 8 }}>No wallets available</Text>
          </View>
        ) : (
          <BottomSheetScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            {wallets.map((wallet) => (
              <CardWallet
                key={wallet.id}
                theme={wallet.theme as keyof typeof Colors.cards}
                wallet={wallet}
                currency={currency}
                width={tileSize}
                onSetActive={() => onPress(wallet.id, wallet.wallet)}
                activeId={selectedWalletId}
              />
            ))}
          </BottomSheetScrollView>
        )}
      </View>
    </View>
  );
};

export default SelectWallet;
