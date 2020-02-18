import styled from 'styled-components';

const Base = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.6rem;
`;

export const Active = styled(Base)`
    width: 3.2rem;
`;

export const Exclude = styled(Base)`
    visibility: hidden;
    border-left: 1px solid ${({ theme }) => theme.gray200};
`;

export const FilterItem = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid ${({ theme }) => theme.gray200};   

    .filter-label {
        flex: 1;
        display: block;
        text-align: left;
        font-size: 1.1rem;
        font-weight: 700;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 1.6rem;
    }

    &:hover {
        background: ${({ theme }) => theme.gray50};
        ${Exclude} {
            visibility: visible;
        }
    }
`;
