import { Link } from "expo-router";
import { Text, View } from "@/components/themed";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/home" push>
        <Text>Go to About screen</Text>
      </Link>
    </View>
  );
}
