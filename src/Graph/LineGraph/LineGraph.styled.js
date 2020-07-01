import styled from 'styled-components';

export const Wrapper = styled.div`
    height: inherit;
    width: inherit;
    min-height: 200px;
`;

export const Graph = styled.div`
    height: calc(100% - 4rem);
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
    height: 4rem;
    margin-left: 4rem;
`;

export const Stat = styled.div`
    height: 100%;
    margin-right: 1rem;
    border-left: 5px solid ${({ color }) => (color || 'steelblue')};
    display: flex;
    align-items: flex-start;
    justify-content: center;
    font-size: 1.3rem;
    padding-left: .4rem;
    flex-direction: column;
`;
