import { Text } from "@/components/text/text";
import { BasicScrollView, CenteredView } from "@/constants/styles";
import { View } from "react-native";

export default function MainPage() {
  return (
    <BasicScrollView>
      <CenteredView>
        <View style={{ marginVertical: 32 }}>
          <Text.Body>Welcome!</Text.Body>
        </View>
        <Text.Body>Please select a Module from Settings to get started</Text.Body>
      </CenteredView>
    </BasicScrollView>
  );
}
