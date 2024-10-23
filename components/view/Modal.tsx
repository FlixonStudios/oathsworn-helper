import { GestureResponderEvent } from "react-native";
import styled from "styled-components/native";

interface Props {
  show: boolean;
  onBackgroundPress?: () => void;
  setShow: (show: boolean) => void;
  children: any;
}

/**
 * Scroll view in Modal or View with position absolute does not work in RN
 * Consider 'global' Modal in _layout
 */

export function StyledModal({
  show,
  children,
  setShow,
  onBackgroundPress,
}: Props) {
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
      <ModalView onPress={handleBackgroundPress}>
        <ContentView onPress={(e) => onContentPress(e)}>{children}</ContentView>
      </ModalView>
    )
  );
}

export const ModalView = styled.Pressable`
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
  padding: 48px;
`;

export const ContentView = styled.Pressable`
  border-radius: 5px;
  flex-grow: 1;
`;
