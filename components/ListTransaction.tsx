import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "./themed";
import React from "react";
import { FONT_SIZE } from "@/constants/styling";
import { formatCurrency } from "react-native-format-currency";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TransactionsWithCategory } from "@/db/schema";
import { useAppStore } from "@/store/appStore";
import { formatDate } from "@/lib/helpers";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { getIcon } from "@/lib/helpers/getIcon";
import { Colors, EXPENSE_COLOR, INCOME_COLOR } from "@/constants/Colors";

const OPTION_WIDTH = 80;

const RightAction = (
  prog: SharedValue<number>,
  drag: SharedValue<number>,
  transactionId: number,
  onDelete: (id: number) => Promise<void>,
) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + OPTION_WIDTH + 12 }],
    };
  });

  return (
    <Reanimated.View style={[styleAnimation, { paddingLeft: 20 }]}>
      <TouchableOpacity
        style={[
          {
            backgroundColor: "#d32f2f",
            height: "100%",
            width: OPTION_WIDTH - 5,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
        onPress={() => onDelete(transactionId)}
        activeOpacity={0.7}
      >
        <Text>Delete</Text>
      </TouchableOpacity>
    </Reanimated.View>
  );
};

const ListTransaction = ({
  transaction,
  onDelete,
  type = "secondaryBackground",
  formatType = "default",
}: {
  transaction: TransactionsWithCategory;
  onDelete: (id: number) => Promise<void>;
  type?: keyof typeof Colors.light & keyof typeof Colors.dark;
  formatType?: "default" | "short";
}) => {
  const { category } = transaction;

  const color = useThemeColor({}, "text");
  const currency = useAppStore((state) => state.currency);

  const [valueFormattedWithSymbol] = formatCurrency({
    amount: +transaction.amount,
    code: currency,
  });

  return (
    <ReanimatedSwipeable
      friction={1.5}
      enableTrackpadTwoFingerGesture
      rightThreshold={50}
      renderRightActions={(progress, dragValue) =>
        RightAction(progress, dragValue, transaction.id, onDelete)
      }
    >
      <TouchableOpacity onPress={() => null}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 4,
            marginVertical: 12,
          }}
          type={type}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              alignItems: "center",
            }}
            type={type}
          >
            {getIcon({
              icon: category?.icon!,
              iconType: category?.iconType!,
              color,
              size: 22,
            })}
            <View style={{ gap: 3 }} type={type}>
              <Text style={{ fontSize: FONT_SIZE.PARAGRAPH }}>
                {transaction.category?.category}
              </Text>
              <Text style={{ color: "gray", fontSize: FONT_SIZE.CHIP }}>
                {formatDate(transaction?.created_at, formatType)}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, gap: 3 }} type={type}>
            <Text
              style={[
                {
                  textAlign: "right",
                  fontSize: FONT_SIZE.PARAGRAPH,
                },
                transaction.type.toLowerCase() === "expense"
                  ? { color: EXPENSE_COLOR }
                  : { color: INCOME_COLOR },
              ]}
            >
              {transaction.type.toLowerCase() === "expense" ? "-" : "+"}
              {valueFormattedWithSymbol}
            </Text>
            <Text
              style={{
                color: "gray",
                fontSize: FONT_SIZE.CHIP,
                textAlign: "right",
                textTransform: "capitalize",
              }}
            >
              {transaction.type}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </ReanimatedSwipeable>
  );
};

export default ListTransaction;
