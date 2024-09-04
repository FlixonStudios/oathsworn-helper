import { Recommendations } from "@/models/types";
import { Text } from "react-native";
import { ResultCard, ResultValue, Section } from "./results-section.styles";

interface Props {
  skillCheckResults?: Recommendations;
  start: number;
  end: number;
}

export function ResultsSection({ skillCheckResults, start, end }: Props) {
  return (
    <Section>
      {skillCheckResults ? (
        Object.keys(skillCheckResults)
          .slice(start, end)
          .map((result, i) => (
            <ResultCard key={i}>
              <Text>{result}</Text>
              <ResultValue>
                <Text>{skillCheckResults[result].p_target}</Text>
              </ResultValue>
            </ResultCard>
          ))
      ) : (
        <></>
      )}
    </Section>
  );
}
