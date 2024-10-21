import { Text } from "@/components/text/text";
import { Color, ResultContainer, ResultValue } from "@/constants/styles";

interface Props {
  title: string;
  description?: string | number;
  subtext?: string | number;
  color?: Color;
}

export function ResultCard(props: Props) {
  const { title, description, subtext, color: color } = props;
  const valToString = (val?: number | string) => {
    if (!val && val !== 0) return "";
    return typeof val === "number" ? val.toFixed(2).toString() : val;
  };
  const renderIfPresent = (val: string) => {
    return val ? (
      <ResultValue>
        <Text.Body style={{ color: color ?? Color.WHITE }}>{val}</Text.Body>
      </ResultValue>
    ) : (
      <></>
    );
  };

  return (
    <ResultContainer style={{ ...(color ? { borderColor: color } : {}) }}>
      <Text.Body style={{ color: color ?? Color.WHITE }}>{title}</Text.Body>
      {renderIfPresent(valToString(description))}
      {renderIfPresent(valToString(subtext))}
    </ResultContainer>
  );
}
