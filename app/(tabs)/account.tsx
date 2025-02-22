import ListOption from "@/components/account/ListOption";
import { Text, View } from "@/components/themed";
import { defaultStyles, FONT_SIZE } from "@/constants/styling";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppStore } from "@/store/appStore";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import Button from "@/components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTransactions } from "@/hooks/useTransactions";

const Account = () => {
  const queryClient = useQueryClient();

  const currency = useAppStore((state) => state.currency);
  const { resetUserData } = useTransactions();

  const bgColor = useThemeColor({}, "background");
  const redBg = useThemeColor({}, "error");
  const router = useRouter();

  const [showResetModal, setShowResetModal] = useState(false);

  const { mutateAsync: resetData, isPending } = useMutation({
    mutationFn: resetUserData,
    onSuccess: () => {
      setShowResetModal(false);
      queryClient.invalidateQueries({
        queryKey: ["wallet"],
      });
      queryClient.invalidateQueries({
        queryKey: ["wallets"],
      });
      queryClient.invalidateQueries({
        queryKey: ["all-transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["wallet-summary"],
      });

      router.push("/(modals)/add-wallet");
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[defaultStyles.container]}>
          <Text style={{ fontSize: FONT_SIZE.HEADING }}>Settings</Text>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: FONT_SIZE.PARAGRAPH, fontWeight: "500" }}>
              Account Settings
            </Text>
            <View style={{ gap: 8, marginTop: 10 }}>
              <ListOption label="Name" value="" onClick={() => alert("hi")} />
              <ListOption label="Email" value="" onClick={() => alert("hi")} />
              <ListOption
                label="Change Password"
                value=""
                onClick={() => alert("hi")}
              />
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: FONT_SIZE.PARAGRAPH, fontWeight: "500" }}>
              App Settings
            </Text>
            <View style={{ gap: 8, marginTop: 10 }}>
              <ListOption
                label="Currency"
                value={currency}
                onClick={() =>
                  router.push("/(modals)/account/currency-selection")
                }
              />
              <ListOption
                label="Categories"
                renderItem={(children) => (
                  <Link href={"/(modals)/category"} style={{ width: "100%" }}>
                    {children}
                  </Link>
                )}
                onClick={() => router.push("/(modals)/category")}
              />
              <ListOption
                label="Reminder Notification"
                value=""
                onClick={() => router.push("/(modals)/reminders")}
              />
              <ListOption
                label="Backup & Sync Data"
                value=""
                onClick={() => alert("hi")}
              />
              <ListOption
                label="Reset Data"
                value=""
                onClick={() => setShowResetModal(true)}
              />
              <ListOption
                label="App Lock"
                value=""
                onClick={() => alert("App Lock")}
              />
            </View>
          </View>
          <View style={{ marginTop: 30, paddingBottom: 60 }}>
            <Text style={{ fontSize: FONT_SIZE.PARAGRAPH, fontWeight: "500" }}>
              App Support
            </Text>
            <View style={{ gap: 8, marginTop: 10 }}>
              <ListOption
                label="Feedback"
                value=""
                onClick={() => router.push("/(modals)/support/feedback")}
              />
              <ListOption
                label="Feature Request"
                value=""
                onClick={() => router.push("/(modals)/support/feature-request")}
              />
              <ListOption
                label="About Kaperas"
                value=""
                onClick={() => router.push("/(modals)/about")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal
        isVisible={showResetModal}
        onBackdropPress={() => setShowResetModal(false)}
        onSwipeComplete={() => setShowResetModal(false)}
        swipeDirection={["down"]}
        style={{ justifyContent: "flex-end", margin: 0 }}
        hideModalContentWhileAnimating={true}
      >
        <View
          style={{
            borderRadius: 10,
            paddingHorizontal: 24,
            paddingTop: 24,
            paddingBottom: 40,
          }}
        >
          <Text style={{ fontSize: FONT_SIZE.TITLE }}>Reset Data</Text>
          <Text style={{ marginTop: 10 }}>
            Are you sure you want to reset all of your data? This will
            permanently delete all your saved information and restore default
            settings.
          </Text>
          <Text style={{ marginTop: 10 }}>
            Note: This action cannot be undone. Please proceed with caution
          </Text>
          <View style={{ marginTop: 18 }}>
            <Button
              color={redBg}
              label="Reset Data"
              onPress={resetData}
              isLoading={isPending}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Account;
