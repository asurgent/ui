import styled from 'styled-components';

export const Base = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.6rem;
`;

export const Active = styled(Base)`
    width: 3.2rem;
`;


export const FilterItem = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid ${({ theme }) => theme.gray200};    
    opacity: ${({ matched }) => (matched ? 1 : 0.5)};
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme.gray50};
    }
`;

export const FilterLabel = styled.div`
    flex: 1;
    display: block;
    text-align: left;
    font-size: 1.1rem;
    font-weight: 700;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1.6rem;
    max-width: 29.5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;
export const Labels = styled.div`
    width: 100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
`;
export const Label = styled.div`
    flex: 1;
    display: block;
    text-align: left;
    font-size: 1.1rem;
    font-weight: 700;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1.6rem;
    max-width: 29.5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

export const SecondaryLabel = styled(Label)`
    color: ${({ theme }) => theme.gray400};
    font-size: 1rem;
`;
