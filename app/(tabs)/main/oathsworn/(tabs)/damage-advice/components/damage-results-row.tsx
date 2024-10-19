import { ColoredText } from "@/components/text/text";
import { StackedRow } from "@/components/view/StackedRow";
import { colorMap } from "@/constants/styles";
import { useGame } from "@/context-providers/oathsworn/oathsworn-hook";
import { DamageAdvicePerEmpowerCombiResults, Empower } from "@/models/types";
import {
  Container,
  EmpowerValueContainer,
  EmpowerValueView,
} from "./damage-results-row.styles";
import { ResultsSectionRow } from "./results-section";

interface Props {
  results: DamageAdvicePerEmpowerCombiResults[];
  empowerCombi: Empower;
}
export function DamageResultRow(props: Props) {
  const { gameState } = useGame();
  const { results, empowerCombi } = props;

  return (
    <Container>
      <EmpowerValueContainer>
        {gameState.decks.map((_, i) => {
          const empValue = empowerCombi[i.toString() as keyof Empower];
          const uid = Object.entries(empowerCombi)
            .reduce((prev: any[], curr) => prev.concat(curr), [])
            .map((val) => val.toString())
            .join("");
          // cannot return <></> here as React will complain about unique key in list
          if (!empValue) return null;
          return (
            <EmpowerValueView
              key={`${uid}-${i}`}
              style={{ backgroundColor: colorMap[i] }}
            >
              <ColoredText text={empValue.toString()} bgColor={colorMap[i]} />
            </EmpowerValueView>
          );
        })}
      </EmpowerValueContainer>
      <StackedRow
        values={results}
        Component={ResultsSectionRow}
        otherProps={{ empowerCombi: empowerCombi }}
      />
    </Container>
  );
}
