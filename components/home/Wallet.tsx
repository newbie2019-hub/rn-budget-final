import { StyleSheet, TouchableOpacity } from "react-native";

import Entypo from "@expo/vector-icons/Entypo";
import { FONT_SIZE } from "@/constants/styling";
import { View, Text } from "../themed";
import * as schema from "@/db/schema";

import { useThemeColor } from "@/hooks/useThemeColor";

import { formatCurrency } from "react-native-format-currency";
import { useAppStore } from "@/store/appStore";
import { EXPENSE_COLOR, INCOME_COLOR } from "@/constants/Colors";

interface WalletSummary {
  income: number;
  expense: number;
}

const Wallet = ({
  wallet,
  currency,
  summary,
}: {
  wallet?: schema.Wallets;
  currency: string;
  summary: WalletSummary;
}) => {
  const color = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");
  const borderColor = useThemeColor({}, "borderColor");

  const maskedValue = useAppStore((state) => state.maskedValue);
  const setMaskedValue = useAppStore((state) => state.setMaskedValue);

  const [valWithSymbol, valWithoutSymbol, symbol] = formatCurrency({
    amount: Number(wallet?.amount || 0),
    code: currency,
  });

  const [income] = formatCurrency({
    amount: Number(summary?.income ?? 0),
    code: currency,
  });

  const [expense] = formatCurrency({
    amount: Number(summary?.expense ?? 0),
    code: currency,
  });

  return (
    <View style={{ marginTop: 20, marginBottom: 14 }}>
      <Text style={{ fontSize: FONT_SIZE.PARAGRAPH, color: textSecondary }}>
        Wallet Balance
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: FONT_SIZE.AMOUNT }}>{symbol}</Text>
          <Text style={{ fontSize: FONT_SIZE.AMOUNT }}>
            {maskedValue ? valWithoutSymbol : "****"}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setMaskedValue(!maskedValue)}>
          <Entypo
            name={maskedValue ? "eye" : "eye-with-line"}
            size={24}
            color={color}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.dashedBorder, { borderColor: borderColor }]}></View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 4,
          paddingVertical: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: FONT_SIZE.DESCRIPTION, color: textSecondary }}
          >
            Expense
          </Text>
          <Text style={{ fontSize: FONT_SIZE.TITLE, color: EXPENSE_COLOR }}>
            - {expense}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: FONT_SIZE.DESCRIPTION, color: textSecondary }}
          >
            Income
          </Text>
          <Text style={{ fontSize: FONT_SIZE.TITLE, color: INCOME_COLOR }}>
            + {income}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  dashedBorder: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    marginTop: 8,
    marginBottom: 4,
  },
});
