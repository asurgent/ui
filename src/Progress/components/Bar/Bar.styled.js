import styled from 'styled-components';

export const ProgessBar = styled.div`
  background: ${({ theme }) => theme.gray300};
  width: ${({ width }) => width};
  height: 100%;
`;

export const FilledPart = styled.div`
  background: ${({ theme }) => theme.blue900};
  height: ${({ progress }) => `${progress}%`};
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: ${({ height }) => height || '100%'};
`;
