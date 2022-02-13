import { debounce } from 'lodash';
import { PerformanceTrackerScreenIds } from './types';

const performanceTracker = () => {
  let totalRenderTime = 0;

  const debounced = debounce(
    (id, addScreenRender) => {
      if (totalRenderTime > 10) {
        console.log(`🛠  ${id} rendered in ${totalRenderTime}ms`);
        // Add the value to context
        if (addScreenRender) {
          addScreenRender(id, totalRenderTime);
        }
      }
      totalRenderTime = 0;
    },
    1000,
    { maxWait: 5000 },
  );

  const trackRender = (
    _id: string,
    _phase: 'mount' | 'update',
    actualDuration: number,
    _baseDuration: number,
    _startTime: number,
    _commitTime: number,
    _interactions: any,
    addScreenRender?: (name: PerformanceTrackerScreenIds, time: number) => void,
  ) => {
    totalRenderTime += actualDuration;
    debounced(_id, addScreenRender);
  };

  return {
    trackRender,
  };
};

export { performanceTracker };