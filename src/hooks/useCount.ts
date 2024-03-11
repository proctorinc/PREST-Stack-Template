import { useState } from "react";

const useCount = () => {
  const [count, setCount] = useState(0);

  function add() {
    setCount((prev) => prev + 1);
  }

  return {
    count,
    add,
  };
};

export default useCount;
