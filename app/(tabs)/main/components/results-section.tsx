import { SkillCheckResult } from "@/models/types";
import { Text } from "react-native";
import { ResultCard, ResultValue, Section } from "./results-section.styles";

interface Props {
  skillCheckResults?: SkillCheckResult[];
}

export function ResultsSection({ skillCheckResults }: Props) {
  return (
    <Section>
      {skillCheckResults ? (
        skillCheckResults.map((result, i) => (
          <ResultCard key={i}>
            <Text>{result.cardsToDraw}</Text>
            <ResultValue>
              <Text>{result.p_target}</Text>
            </ResultValue>
          </ResultCard>
        ))
      ) : (
        <></>
      )}
    </Section>
  );
}
