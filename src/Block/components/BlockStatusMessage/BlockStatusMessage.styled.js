import styled from 'styled-components';
import { BaseBlock } from '../Block.styled';

export const ErrorState = styled(BaseBlock)`
    justify-content: center;
    align-items: flex-start;  
    flex-direction: column;
    background: ${({ theme }) => theme.rgba(theme.ruby800, 0.1)};
    border: 1px solid ${({ theme }) => theme.rgba(theme.ruby800, 0.8)};
    border-radius: 5px;

    padding: 1rem;
    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointMobile * 10}px`}) {
        padding: 1rem;
    }
    > b.title {
        margin-bottom: 1rem;
    }
    p {
        margin: 0;
        padding: 0;
    }
`;

export const WarningState = styled(ErrorState)`
    background: ${({ theme }) => theme.rgba(theme.gold800, 0.1)};
    border: 1px solid ${({ theme }) => theme.rgba(theme.gold800, 0.8)};
`;

export const InfoState = styled(ErrorState)`
    background: ${({ theme }) => theme.rgba(theme.blue100, 0.1)};
    border-color: ${({ theme }) => theme.rgba(theme.blue100, 0.8)};
`;
