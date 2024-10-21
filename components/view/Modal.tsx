import { GestureResponderEvent } from "react-native";
import styled from "styled-components/native";

interface Props {
  show: boolean;
  onBackgroundPress?: () => void;
  setShow: (show: boolean) => void;
  children: any;
}

export function Modal({ show, children, setShow, onBackgroundPress }: Props) {
  function handleBackgroundPress() {
    if (onBackgroundPress) {
      onBackgroundPress();
      return;
    }
    setShow(false);
  }

  function onContentPress(e: GestureResponderEvent) {
    e.stopPropagation();
  }

  return (
    show && (
      <ModalView onPress={handleBackgroundPress} style={{}}>
        <ContentView onPress={(e) => onContentPress(e)}>{children}</ContentView>
      </ModalView>
    )
  );
}

export const ModalView = styled.Pressable`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 50;
  padding: 64px;
`;

export const ContentView = styled.Pressable`
  display: flex;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;
