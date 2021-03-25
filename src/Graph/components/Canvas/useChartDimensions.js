import { useRef, useState, useEffect } from 'react';

const isNumber = (value, fallback) => {
  if (Number.isInteger(value)) {
    return value;
  }

  return fallback;
};

const combineChartDimensions = (dimensions) => {
  const parsedDimensions = {
    ...dimensions,
    marginTop: isNumber(dimensions.marginTop, 10),
    marginRight: isNumber(dimensions.marginRight, 10),
    marginBottom: isNumber(dimensions.marginBottom, 30),
    marginLeft: isNumber(dimensions.marginLeft, 40),
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

export const useChartDimensions = (customDimensions) => {
  const ref = useRef();
  const [width, setWidth] = useState(customDimensions.width || null);
  const [height, setHeight] = useState(customDimensions.height || null);

  const dimensions = combineChartDimensions({ ...customDimensions, width, height });

  useEffect(() => {
    const element = ref.current;
    const resizeObserver = new ResizeObserver(
      (entries) => {
        // Wrap it in requestAnimationFrame to avoid "ResizeObserver loop limit exceeded"
        // which means that ResizeObserver was not able to deliver all
        // observations within a single animation frame
        window.requestAnimationFrame(() => {
          if (!Array.isArray(entries)) return;
          if (!entries.length) return;
          const entry = entries[0];

          if (!dimensions.width && width !== entry.contentRect.width) {
            setWidth(entry.contentRect.width);
          }
          if (!dimensions.height && height !== entry.contentRect.height) {
            setHeight(entry.contentRect.height);
          }
        });
      },
    );
    resizeObserver.observe(element);

    return () => { resizeObserver.unobserve(element); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newSettings = ({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });

  return [ref, newSettings];
};
