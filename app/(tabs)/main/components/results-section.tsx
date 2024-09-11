import { ResultCard } from "@/components/view";
import { SkillCheckResult } from "@/models/types";
import { Section } from "./results-section.styles";

interface Props {
  results: SkillCheckResult[];
}

export function ResultsSection({ results }: Props) {
  return (
    <Section>
      {results.map((result, i) => (
        <ResultCard
          key={i}
          title={result.cardsToDraw.toFixed(0)}
          description={result.p_target}
        />
      ))}
    </Section>
  );
}
