import { DamageAdvicePerEmpowerCombiResults, Empower } from "@/models/types";
import { Section } from "./results-section.styles";
import { ResultCard } from "@/components/view";

interface Props {
  results: DamageAdvicePerEmpowerCombiResults[];
  empowerCombi: Empower;
}

export function ResultsSectionRow({ results }: Props) {
  return (
    <Section>
      {results.map((result, i) => (
        <ResultCard
          key={i}
          title={result.cardsToDraw.toFixed(0)}
          description={result.averageDamage}
          subtext={result.missChance}
        />
      ))}
    </Section>
  );
}
