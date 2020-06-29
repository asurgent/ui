import styled from 'styled-components';

export const Wrapper = styled.div`
    height: inherit;
    min-height: 200px;
`;

export const Graph = styled.div`
    height: calc(100% - 4rem);
`;

export const Stats = styled.div`
    height: 4rem;
    margin-left: 4rem;
`;

export const Stat = styled.div`
    height: 100%;
    width: 10rem;
    border-left: 5px solid red;
    border-color: red;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    font-size: 1.3rem;
    padding-left: .4rem;
    flex-direction: column;
`;
