import {
  DamageAdvicePerEmpowerCombiResults,
  Empower,
} from "@/models/types";
import { Text } from "react-native";
import { ResultCard, ResultValue, Section } from "./results-section.styles";

interface Props {
  results?: DamageAdvicePerEmpowerCombiResults[];
  empowerCombi: Empower;
}

export function ResultsSectionRow({ results }: Props) {
  return (
    <Section>
      {results ? (
        results.map((result, i) => (
          <ResultCard key={i}>
            <Text>{result.cardsToDraw}</Text>
            <ResultValue>
              <Text>{result.averageDamage}</Text>
            </ResultValue>
            <ResultValue>
              <Text>{result.missChance}</Text>
            </ResultValue>
          </ResultCard>
        ))
      ) : (
        <></>
      )}
    </Section>
  );
}
