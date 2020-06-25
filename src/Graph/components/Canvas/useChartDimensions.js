import { ResizeObserver } from '@juggle/resize-observer';
import { useRef, useState, useEffect } from 'react';

const combineChartDimensions = (dimensions = {}) => {
  const parsedDimensions = {
    ...dimensions,
    marginTop: dimensions.marginTop || 10,
    marginRight: dimensions.marginRight || 10,
    marginBottom: dimensions.marginBottom || 40,
    marginLeft: dimensions.marginLeft || 40,
  };
  return {
    ...parsedDimensions,
    totalHeight: (
      parsedDimensions.height
      + parsedDimensions.marginTop
      + parsedDimensions.marginBottom
    ),
    totalWidth: (
      parsedDimensions.width
      + parsedDimensions.marginLeft
      + parsedDimensions.marginRight
    ),
    boundedHeight: Math.max(
      parsedDimensions.height
        - parsedDimensions.marginTop
        - parsedDimensions.marginBottom,
      0,
    ),
    boundedWidth: Math.max(
      parsedDimensions.width
        - parsedDimensions.marginLeft
        - parsedDimensions.marginRight,
      0,
    ),
  };
};


export const useChartDimensions = () => {
  const ref = useRef();
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(200);

  const dimensions = combineChartDimensions({ width, height });

  useEffect(() => {
    const element = ref.current;

    const resizeObserver = new ResizeObserver(
      (entries) => {
        if (!Array.isArray(entries)) return;
        if (!entries.length) return;
        const entry = entries[0];


        if (width !== entry.contentRect.width) {
          setWidth(entry.contentRect.width);
        }
        if (height !== entry.contentRect.height) {
          setHeight(entry.contentRect.height);
        }
      },
    );
    resizeObserver.observe(element);

    return () => { resizeObserver.unobserve(element); };
  }, [dimensions, height, width]);

  const newSettings = ({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });

  return [ref, newSettings];
};
