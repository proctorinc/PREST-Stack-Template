import { FC } from "react";

type TestComponentProps = {
  word: string;
};

const TestComponent: FC<TestComponentProps> = ({ word }) => {
  return <div>{word}</div>;
};

export default TestComponent;
