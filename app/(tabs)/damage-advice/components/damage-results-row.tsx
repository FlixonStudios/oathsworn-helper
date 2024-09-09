import { DamageAdvicePerEmpowerCombiResults, Empower } from "@/models/types";
import { ResultsSectionRow } from "./results-section";
import { View } from "react-native";

interface Props {
  results?: DamageAdvicePerEmpowerCombiResults[];
  empowerCombi: Empower;
}
export function DamageResultRow(props: Props) {
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

  return <View>{renderResultsSections()}</View>;
}
