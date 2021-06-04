import styled from 'styled-components';

export const Base = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
`;

export const Active = styled(Base)`
    width: 2.8125rem;
`;

export const FilterItem = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid ${({ theme }) => theme.gray200};    
    opacity: ${({ matched, disabled }) => ((matched || !disabled) ? 1 : 0.5)};
    text-decoration: ${({ disabled }) => ((disabled) && 'line-through')};
     
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme.gray50};
    }
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
`;

export const FilterLabel = styled.div`
    flex: 1;
    display: block;
    text-align: left;
    font-size: 0.6875rem;
    font-weight: 700;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem;
    display: block;
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
    font-size: 0.6875rem;
    font-weight: 700;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem;
    max-width: 18.4375rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

export const SecondaryLabel = styled(Label)`
    color: ${({ theme }) => theme.gray400};
    font-size: 0.625rem;
`;
