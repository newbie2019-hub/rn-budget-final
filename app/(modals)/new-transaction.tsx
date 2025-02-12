import {
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useReducer, useRef, useState } from "react";
import { FONT_SIZE } from "@/constants/styling";
import ListOption from "@/components/transaction/ListOption";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Button from "@/components/Button";
import PressableButton from "@/components/PressableButton";
import { useRouter } from "expo-router";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import BottomSheet from "@/components/BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { View, Text } from "@/components/themed";
import { useThemeColor } from "@/hooks/useThemeColor";
import * as schema from "@/db/schema";
import { options } from "@/lib";
import { Transaction, TransactionAction } from "@/types";
import { useAppStore } from "@/store/appStore";
import { formatCurrency } from "react-native-format-currency";
import SelectWallet from "@/components/wallet/SelectWallet";
import SelectCategory from "@/components/category/SelectCategory";
import { useQuery } from "@tanstack/react-query";
import { useWallets } from "@/hooks/useWallets";
import { useCategories } from "@/hooks/useCategories";

const reducer = (
  state: Transaction,
  action: TransactionAction,
): Transaction => {
  switch (action.type) {
    case "setAmount":
      return { ...state, amount: action.payload };
    case "setWalletId":
      return { ...state, walletId: action.payload };
    case "setCategoryId":
      return { ...state, categoryId: action.payload };
    case "setNotes":
      return { ...state, notes: action.payload };
    case "setType":
      return { ...state, type: action.payload };
    case "setDate":
      return { ...state, addedAt: action.payload };
    default:
      return state;
  }
};

const NewTransaction = () => {
  const currency = useAppStore((state) => state.currency);

  const router = useRouter();
  const textColor = useThemeColor({}, "text");
  const color = useThemeColor({}, "placeholder");

  const { getWallets, storeWallet } = useWallets();
  const { getCategories } = useCategories();

  const selectCategoryRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const selectWalletRef = useRef<BottomSheetModal>(null);

  const [walletName, setWalletName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const [state, dispatch] = useReducer(reducer, {
    type: "expense",
    date: new Date(),
    notes: "",
    categoryId: null,
    walletId: null,
    amount: 0.0,
    addedAt: new Date(),
  } as Transaction);

  const [valWithSymbol, valWithoutSymbol, symbol] = formatCurrency({
    amount: Number(state?.amount || 0),
    code: currency,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: wallets } = useQuery({
    queryKey: ["wallet"],
    queryFn: getWallets,
  });

  const onSubmit = async () => {
    const transaction: Omit<
      schema.Transactions,
      "id" | "updated_at" | "deleted_at"
    > = {
      wallet_id: +state.walletId!,
      category_id: +state.categoryId!,
      amount: +state.amount,
      notes: state.notes,
      type: state.type,
      created_at: new Date(),
    };

    await storeWallet(state, transaction);
    router.back();
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate ?? new Date();
    bottomSheetModalRef.current?.close();
    dispatch({ type: "setDate", payload: currentDate });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ flex: 0.85 }}>
          <View
            style={{
              height: 5,
              backgroundColor: "gray",
              width: 40,
              borderRadius: 20,
              marginTop: 10,
              marginHorizontal: "auto",
            }}
          ></View>
          <Text
            style={{
              fontSize: FONT_SIZE.DESCRIPTION,
              textAlign: "center",
              marginTop: 8,
            }}
          >
            NEW TRANSACTION
          </Text>

          <View
            style={{
              paddingHorizontal: 20,
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <View style={{ marginTop: 40 }}>
              <Text style={{ fontSize: FONT_SIZE.CHIP, textAlign: "center" }}>
                Enter Amount
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Text style={{ marginBottom: 10, fontSize: FONT_SIZE.LG }}>
                  {symbol}
                </Text>
                <TextInput
                  value={state.amount.toString()}
                  onChangeText={(val) =>
                    dispatch({ type: "setAmount", payload: val })
                  }
                  placeholder="0.00"
                  keyboardType="numeric"
                  style={{
                    fontSize: FONT_SIZE.AMOUNT,
                    color: textColor,
                  }}
                  placeholderTextColor={color}
                />
              </View>
              <PressableButton
                options={options}
                value={state.type}
                onPress={(val) => dispatch({ type: "setType", payload: val })}
              />
            </View>
            <View>
              <ListOption
                icon={
                  <Ionicons name="wallet-outline" size={20} color={"gray"} />
                }
                label="WALLET"
                placeholder="Select Wallet"
                value={walletName}
                onPress={() => selectWalletRef.current?.present()}
              />
              <ListOption
                icon={<FontAwesome name="calendar" size={20} color="gray" />}
                label="DATE"
                value={state.addedAt.toString()}
                onPress={() => bottomSheetModalRef.current?.present()}
              />
              <ListOption
                icon={
                  <MaterialCommunityIcons
                    name="format-list-bulleted-type"
                    size={20}
                    color="gray"
                  />
                }
                placeholder="Select Category"
                label="CATEGORY"
                value={categoryName}
                onPress={() => selectCategoryRef.current?.present()}
              />
              <ListOption
                icon={
                  <FontAwesome name="sticky-note-o" size={20} color="gray" />
                }
                label="NOTES"
                value={state.notes}
                renderItem={
                  <View>
                    <TextInput
                      value={state.notes}
                      onChangeText={(val) =>
                        dispatch({ type: "setNotes", payload: val })
                      }
                      placeholder="Enter your note..."
                      style={{
                        fontSize: FONT_SIZE.PARAGRAPH,
                        color: textColor,
                      }}
                      maxLength={35}
                      multiline
                    />
                  </View>
                }
              />
            </View>
            {/* Save Transaction */}
            <Button label="SAVE TRANSACTION" onPress={() => onSubmit()} />
          </View>
        </View>
        <BottomSheet ref={bottomSheetModalRef} snapPoints={["40%", "50%"]}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <DateTimePicker
              testID="dateTimePicker"
              value={state.addedAt}
              mode="date"
              display="inline"
              onChange={onChange}
              style={{ backgroundColor: "transparent" }}
            />
          </View>
        </BottomSheet>
        <BottomSheet ref={selectWalletRef} snapPoints={["30%", "65%", "95%"]}>
          <SelectWallet
            wallets={wallets}
            selectedWalletId={state.walletId}
            onPress={(walletId: number, walletName: string) => {
              dispatch({ type: "setWalletId", payload: walletId });
              setWalletName(walletName);
              selectWalletRef.current?.close();
            }}
          />
        </BottomSheet>

        <BottomSheet ref={selectCategoryRef} snapPoints={["30%", "65%", "95%"]}>
          <SelectCategory
            selectedCategory={state.categoryId}
            categories={categories}
            onPress={(category: schema.Categories) => {
              dispatch({ type: "setCategoryId", payload: category.id });
              setCategoryName(category.category);
              selectCategoryRef.current?.close();
            }}
          />
        </BottomSheet>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewTransaction;
