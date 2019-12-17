import styled from 'styled-components';

export const Default = styled.div`
    font-size: 1rem;
    line-height: 1rem;
    padding: .4rem;
    border: 1px solid ${({ theme }) => theme.gray300};
    border-radius: 2px;
    background: ${({ theme }) => theme.white};
`;

export const TagsCollection = styled.div`
    display: flex;
    
    ${Default} {
        margin-right: .4rem;
        
        &:last-child {
            margin-right: 0;
        }
    }
`;
export const SpillOver = styled.div`
    font-size: 1.2rem;
    line-height: 1.2rem;
    padding: .4rem;
    padding-left: 0;
    font-weight: 700;
`;
