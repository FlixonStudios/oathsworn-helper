import { ResultCard } from "@/components/view";
import { SkillCheckResult } from "@/models/types";
import { Section } from "./results-section.styles";
import { Color } from "@/constants/styles";

interface Props {
  results: SkillCheckResult[];
  color?: Color;
}

export function ResultsSection({ results, color }: Props) {
  return (
    <Section>
      {results.map((result, i) => (
        <ResultCard
          key={i}
          title={result.cardsToDraw.toFixed(0)}
          description={result.p_target}
          color={color}
        />
      ))}
    </Section>
  );
}
