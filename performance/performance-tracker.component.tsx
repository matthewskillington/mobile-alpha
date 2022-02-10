import React, { Profiler, useContext, useMemo } from 'react';
import { PerformanceContext } from './performance-context';
import { performanceTracker } from './performanceTracker';

const PerformanceTracker = (props: any) => {
  const { addScreenRender } = useContext(PerformanceContext);
  const { children } = props;
  const { id } = props;

  const { trackRender } = useMemo(() => performanceTracker(), []);

  return (
    <Profiler
      id={id}
      onRender={(
        _id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
      ) =>
        trackRender(
          _id,
          phase,
          actualDuration,
          baseDuration,
          startTime,
          commitTime,
          interactions,
          addScreenRender,
        )
      }>
      {children}
    </Profiler>
  );
};

export { PerformanceTracker };