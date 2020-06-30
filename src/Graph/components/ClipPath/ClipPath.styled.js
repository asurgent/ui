import styled from 'styled-components';

export const Clip = styled.rect`
    width: ${({ dimensions, outer, width }) => {
    if (width && width > 1) {
      return `${width}px`;
    }
    return `${outer ? dimensions.width : dimensions.boundedWidth}px`;
  }};
    height: ${({ dimensions, outer, height }) => {
    if (height && height > 1) {
      return `${height}px`;
    }

    return `${outer ? dimensions.height : dimensions.boundedHeight}px`;
  }};
    transform: translate${({ outer, dimensions, transform }) => {
    if (transform && transform.length >= 1) {
      return `(${transform.join('px, ')}px)`;
    }
    if (outer) {
      return `(-${dimensions.marginLeft}px, -${dimensions.marginTop}px)`;
    }

    return '(0, 0)';
  }};
`;
/* <rect  width={width} height={height} /> */
