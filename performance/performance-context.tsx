import React from 'react';
import { PerformanceTrackerScreenIds } from './types';

type ScreenRenders = {
  name: PerformanceTrackerScreenIds;
  times: Array<number>;
};

type PerformanceContextType = {
  renderTimes: Array<ScreenRenders>;
  addScreenRender: (name: PerformanceTrackerScreenIds, time: number) => void;
};

const PerformanceContext = React.createContext<PerformanceContextType>({
  renderTimes: [],
  addScreenRender: () => Promise.resolve(),
});

const keyMapper = (name: PerformanceTrackerScreenIds) => {
  switch (name) {
    case PerformanceTrackerScreenIds.Overview:
      return 0;
    case PerformanceTrackerScreenIds.StockGraph:
      return 1;
    case PerformanceTrackerScreenIds.PredictionsForm:
      return 2;
    case PerformanceTrackerScreenIds.PredictionResult:
      return 3;
    default:
      return null;
  }
};

const PerformanceProvider = (props: any) => {
  const values = [
    {
      name: PerformanceTrackerScreenIds.Overview,
      times: new Array<number>(),
    },
    {
      name: PerformanceTrackerScreenIds.StockGraph,
      times: new Array<number>(),
    },
    {
      name: PerformanceTrackerScreenIds.PredictionsForm,
      times: new Array<number>(),
    },
    {
      name: PerformanceTrackerScreenIds.PredictionResult,
      times: new Array<number>(),
    },
  ];

  const addScreenRender = (name: PerformanceTrackerScreenIds, time: number) => {
    const key = keyMapper(name);
    if (key !== null) {
      values[key].times.push(time);
    }
  };

  const { children } = props;

  return (
    <PerformanceContext.Provider
      value={{ renderTimes: values, addScreenRender }}>
      {children}
    </PerformanceContext.Provider>
  );
};

export { PerformanceProvider, PerformanceContext };