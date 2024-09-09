import { ColoredText } from "@/components/text/text";
import { colorMap } from "@/constants/styles";
import { useGame } from "@/context-providers/game/game-hook";
import { DamageAdvicePerEmpowerCombiResults, Empower } from "@/models/types";
import {
  Container,
  EmpowerValueContainer,
  EmpowerValueView,
} from "./damage-results-row.styles";
import { ResultsSectionRow } from "./results-section";

interface Props {
  results?: DamageAdvicePerEmpowerCombiResults[];
  empowerCombi: Empower;
}
export function DamageResultRow(props: Props) {
  const { gameState } = useGame();
  const { results, empowerCombi } = props;

  function renderResultsSections() {
    if (!results) return <></>;
    const resultsPerSection = 5;
    const arr = [...results];
    const noOfFullSections = Math.floor(arr.length / resultsPerSection);
    const lastSection = arr.length % resultsPerSection;
    let sections = [];
    for (let i = 0; i < noOfFullSections; i++) {
      sections.push(i * resultsPerSection);
    }
    sections.push(noOfFullSections * resultsPerSection + lastSection);
    let start = 0;
    return sections.map((val) => {
      const render = (
        <ResultsSectionRow
          key={val}
          results={arr.slice(start, val)}
          empowerCombi={empowerCombi}
        />
      );
      start = val;
      return render;
    });
  }

  return (
    <Container>
      <EmpowerValueContainer>
        {gameState.decks.map((_, i) => {
          const empValue = empowerCombi[i.toString() as keyof Empower];
          if (!empValue) return <></>;
          return (
            <EmpowerValueView style={{ backgroundColor: colorMap[i] }}>
              <ColoredText text={empValue.toString()} bgColor={colorMap[i]} />
            </EmpowerValueView>
          );
        })}
      </EmpowerValueContainer>
      {renderResultsSections()}
    </Container>
  );
}
