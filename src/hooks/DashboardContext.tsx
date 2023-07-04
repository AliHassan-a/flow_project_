import React, { createContext, useState } from "react";
import { newData } from "../../src/utils/newData";
interface data {
  id: string;
}
interface history {
  problem_description: string;
}
interface MyContextType {
  count: number;
  increment: () => void;
  setHistoryData: (value: history) => void;
  flowData: data[];
  historyData: history;
}

export const MyContext = createContext<MyContextType | undefined>(undefined);

export function MyContextProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = React.useState(0);
  const [flowData, setFlowData] = useState(newData);
  const [historyData, setHistoryData] = useState({ problem_description: "" });
  const increment = () => setCount((prevCount) => prevCount + 1);

  const contextValue: MyContextType = {
    count,
    increment,
    flowData,
    setHistoryData,
    historyData,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
}
