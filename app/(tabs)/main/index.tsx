import { BasicScrollView, CenteredView } from "@/constants/styles";
import { Text, View } from "react-native";

export default function MainPage() {
  return (
    <BasicScrollView>
      <CenteredView>
        <View style={{ marginVertical: 32 }}>
          <Text>Welcome!</Text>
        </View>
        <Text>Please select a game from Settings to get started</Text>
      </CenteredView>
    </BasicScrollView>
  );
}
