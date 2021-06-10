import styled from 'styled-components';

export const Wrapper = styled.div`
    height: inherit;
    width: inherit;
    min-height: 200px;
`;

export const Graph = styled.div`
    height: calc(100% - 2.5rem);
`;

export const NoData = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Stats = styled.div`
    display: flex;
    height: 2.5rem;
    margin-left: 2.5rem;
`;

export const Stat = styled.div`
    height: 100%;
    margin-right: 0.625rem;
    border-left: 5px solid ${({ color }) => (color || 'steelblue')};
    display: flex;
    align-items: flex-start;
    justify-content: center;
    font-size: 0.8125rem;
    padding-left: 0.25rem;
    flex-direction: column;
`;
