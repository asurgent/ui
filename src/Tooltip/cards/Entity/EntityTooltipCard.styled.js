import styled from 'styled-components';

export const EntityName = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 1rem;
    margin-top: '4px';
    opacity: ${({ hasCloudops }) => (hasCloudops ? 1 : 0.15)};
  } 
`;
export const Header = styled.div`
  p {
    font-size: 1.4rem;
    margin: 0;
  }
  & > p {
    font-size: 1rem;
    margin-bottom: 0.8rem;
  }
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  p {
    margin: 0;
    font-size: 12px;
  }
`;
export const Gray = styled.span`
  color: ${({ theme }) => theme.gray600};
`;
