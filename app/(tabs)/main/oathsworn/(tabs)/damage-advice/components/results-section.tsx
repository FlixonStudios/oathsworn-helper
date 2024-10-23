import { DamageAdvicePerEmpowerCombiResults, Empower } from "@/models/types";
import { Section } from "./results-section.styles";
import { ResultCard } from "@/components/view";
import { Color } from "@/constants/styles";

interface Props {
  results: DamageAdvicePerEmpowerCombiResults[];
  color?: Color;
}

export function ResultsSectionRow({ results, color }: Props) {
  return (
    <Section>
      {results.map((result, i) => (
        <ResultCard
          key={i}
          title={result.cardsToDraw.toFixed(0)}
          description={result.averageDamage}
          subtext={result.missChance}
          color={color}
        />
      ))}
    </Section>
  );
}
