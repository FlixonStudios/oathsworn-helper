import styled from "styled-components/native";
import { Text } from "../text/text";
import { BorderedCentered } from "@/constants/styles";
import { AnimatedPressable } from "../pressable";
import { ImageBackground } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  imageSrc?: any;
}

export function ModuleCard({ title, onPress, imageSrc }: Props) {
  const wrapWithImage = (src: any, children: any) => {
    return (
      <ImageBackground
        source={src}
        imageStyle={{
          resizeMode: "cover",
          width: "100%",
          height: "100%",
          borderRadius: 8,
        }}
      >
        {children}
      </ImageBackground>
    );
  };

  const renderContainerAndText = () => {
    return (
      <Container>
        <Text.H1 style={{ color: "white" }}>{title}</Text.H1>
      </Container>
    );
  };
  return (
    <CustomPressable onPress={onPress}>
      {imageSrc
        ? wrapWithImage(imageSrc, renderContainerAndText())
        : renderContainerAndText()}
    </CustomPressable>
  );
}

export const CustomPressable = styled(AnimatedPressable)`
  margin: 16px;
`;

export const Container = styled(BorderedCentered)<{ imageSrc?: string }>`
  display: flex;
  border-radius: 8px;
  border-color: white;
  padding: 32px 16px;
  background-image: ${(props) => props.imageSrc || ""};
`;

export const ModuleName = styled(Text.H1)``;
