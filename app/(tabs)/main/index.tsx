import { BasicScrollView, CenteredView } from "@/constants/styles";
import { Text } from "react-native";
export default function MainPage() {
  return (
    <BasicScrollView>
      <CenteredView>
        <Text>
          Welcome!
          <br />
          <br />
          <br />
        </Text>
        <Text>Please select a game from Settings to get started</Text>
      </CenteredView>
    </BasicScrollView>
  );
}
