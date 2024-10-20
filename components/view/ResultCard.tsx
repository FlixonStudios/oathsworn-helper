import { Text } from "@/components/text/text";
import { Color, ResultContainer, ResultValue } from "@/constants/styles";

interface Props {
  title: string;
  description?: string | number;
  subtext?: string | number;
}

export function ResultCard(props: Props) {
  const { title, description, subtext } = props;
  const valToString = (val?: number | string) => {
    if (!val && val !== 0) return "";
    return typeof val === "number" ? val.toFixed(2).toString() : val;
  };
  const renderIfPresent = (val: string) => {
    return val ? (
      <ResultValue>
        <Text.Body style={{ color: Color.WHITE }}>{val}</Text.Body>
      </ResultValue>
    ) : (
      <></>
    );
  };

  return (
    <ResultContainer>
      <Text.Body  style={{ color: Color.WHITE }}>{title}</Text.Body>
      {renderIfPresent(valToString(description))}
      {renderIfPresent(valToString(subtext))}
    </ResultContainer>
  );
}
