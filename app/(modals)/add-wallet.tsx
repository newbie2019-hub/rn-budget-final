import { TextInput, ScrollView, Dimensions } from "react-native";
import React, { useCallback, useState } from "react";
import { FONT_SIZE } from "@/constants/styling";
import ListOption from "@/components/transaction/ListOption";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Button from "@/components/Button";
import { View, Text } from "@/components/themed";
import { useThemeColor, useWalletTheme } from "@/hooks/useThemeColor";
import ThemePicker from "@/components/wallet/ThemePicker";
import { Colors } from "@/constants/Colors";
import { formatCurrency } from "react-native-format-currency";
import { useAppStore } from "@/store/appStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useWallets } from "@/hooks/useWallets";

const AddWallet = () => {
  const queryClient = useQueryClient();
  const width = Dimensions.get("window").width;

  const [theme, setTheme] = useState<keyof typeof Colors.cards>("celadon");
  const [amount, setAmount] = useState("");
  const [walletName, setWalletName] = useState("");
  const [notes, setNotes] = useState("");

  const textColor = useThemeColor({}, "text");
  const color = useThemeColor({}, "placeholder");
  const textSecondary = useThemeColor({}, "textSecondary");
  const selectedTheme = useWalletTheme(theme);

  const currency = useAppStore((state) => state.currency);
  const { saveWallet } = useWallets();

  const [valWithSymbol, valWithoutSymbol, symbol] = formatCurrency({
    amount: Number(amount || 0),
    code: currency,
  });

  const { mutateAsync: saveAccount } = useMutation({
    mutationFn: () => {
      return saveWallet({
        wallet: walletName,
        amount: +amount,
        notes,
        theme,
        created_at: new Date(),
        active_at: null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallet"],
      });
      queryClient.invalidateQueries({
        queryKey: ["wallets"],
      });
    },
  });

  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={{ flex: 0.86 }}>
        <View
          style={{
            height: 5,
            backgroundColor: "gray",
            width: 40,
            borderRadius: 20,
            marginTop: 8,
            marginHorizontal: "auto",
          }}
        ></View>
        <Text
          style={{
            fontSize: FONT_SIZE.DESCRIPTION,
            textAlign: "center",
            marginTop: 8,
            color: textSecondary,
          }}
        >
          ADD WALLET
        </Text>

        <View
          style={{
            paddingHorizontal: 20,
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginTop: 40 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Text style={{ marginBottom: 10, fontSize: FONT_SIZE.LG }}>
                {symbol}
              </Text>
              <TextInput
                placeholder="0.00"
                keyboardType="numeric"
                style={{
                  fontSize: FONT_SIZE.AMOUNT,
                  color: textColor,
                }}
                value={amount}
                placeholderTextColor={color}
                onChangeText={setAmount}
                autoFocus
              />
            </View>
            <Text
              style={{
                fontSize: FONT_SIZE.PARAGRAPH,
                textAlign: "center",
                marginTop: 4,
                color: textColor,
              }}
            >
              Initial Balance
            </Text>

            <View style={{ marginTop: 60 }}>
              <ListOption
                icon={
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      backgroundColor: selectedTheme.background,
                      borderRadius: 40,
                      borderWidth: 1,
                      borderColor: "white",
                    }}
                  ></View>
                }
                label="THEME"
                value={"Main Wallet"}
                renderItem={
                  <View style={{ marginTop: 2 }}>
                    <ThemePicker theme={theme} onSelect={setTheme} />
                  </View>
                }
              />
              <ListOption
                icon={
                  <Ionicons name="wallet-outline" size={20} color={"gray"} />
                }
                label="ACCOUNT"
                value={"Main Wallet"}
                renderItem={
                  <TextInput
                    value={walletName}
                    onChangeText={setWalletName}
                    placeholder="Wallet Name"
                    style={{
                      fontSize: FONT_SIZE.PARAGRAPH,
                      color: textColor,
                      width,
                    }}
                    maxLength={30}
                  />
                }
              />
              <ListOption
                icon={
                  <FontAwesome name="sticky-note-o" size={20} color="gray" />
                }
                label="NOTES"
                value={"Medicine for cough"}
                renderItem={
                  <TextInput
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Enter your note here"
                    style={{
                      fontSize: FONT_SIZE.PARAGRAPH,
                      color: textColor,
                      width,
                    }}
                    maxLength={30}
                  />
                }
              />
            </View>
          </View>

          {/* Save Transaction */}
          <Button label="SAVE ACCOUNT" onPress={saveAccount} />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddWallet;
