import { ReactNode } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TouchableOpacity } from "react-native";
import { Text, View } from "../themed";

const ListOption = ({
  label,
  onClick,
  value,
  renderItem,
}: {
  label: string;
  onClick: () => void;
  value?: string;
  renderItem?: (children: ReactNode) => ReactNode;
}) => {
  const secondaryBg = useThemeColor({}, "secondaryBackground");

  const baseLayout = (
    <View
      style={{
        padding: 16,
        backgroundColor: secondaryBg,
        borderRadius: 10,
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: secondaryBg,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "500" }}>{label}</Text>
        <Text>{value}</Text>
      </View>
    </View>
  );

  if (renderItem) {
    return renderItem(baseLayout);
  }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onClick}>
      {baseLayout}
    </TouchableOpacity>
  );
};

export default ListOption;
