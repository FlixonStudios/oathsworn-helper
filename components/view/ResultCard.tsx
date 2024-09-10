import { Text } from "react-native";
import { ResultContainer, ResultValue } from "@/constants/styles";

interface Props {
  title: string;
  description?: string | number;
  subtext?: string | number;
}

export function ResultCard(props: Props) {
  const { title, description, subtext } = props;
  const valToString = (val?: number | string) => {
    if (!val) return "";
    return typeof val === "number" ? val.toFixed(2).toString() : val;
  };
  const renderIfPresent = (val: string) => {
    return val ? (
      <ResultValue>
        <Text>{val}</Text>
      </ResultValue>
    ) : (
      <></>
    );
  };

  return (
    <ResultContainer>
      <Text>{title}</Text>
      {renderIfPresent(valToString(description))}
      {renderIfPresent(valToString(subtext))}
    </ResultContainer>
  );
}
