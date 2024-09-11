interface Props {
  values: any[];
  Component: React.ComponentType<{ results: any[] }>;
  otherProps?: any;
}

export function StackedRow(props: Props) {
  const { values, Component, otherProps } = props;

  if (!values) return <></>;

  const valuesPerRow = 5;
  const arr = [...values];
  const noOfFullRows = Math.floor(arr.length / valuesPerRow);
  const lastSection = arr.length % valuesPerRow;

  let sections = [];
  let start = 0;

  for (let i = 0; i < noOfFullRows; i++) {
    sections.push(i * valuesPerRow);
  }

  sections.push(noOfFullRows * valuesPerRow + lastSection);

  return sections.map((val, i) => {
    const render = (
      <Component key={i} results={arr.slice(start, val)} {...otherProps} />
    );
    start = val;
    return render;
  });
}
