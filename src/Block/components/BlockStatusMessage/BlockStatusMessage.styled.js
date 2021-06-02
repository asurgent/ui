import styled from 'styled-components';
import { BaseBlock } from '../Block.styled';

export const ErrorState = styled(BaseBlock)`
    justify-content: center;
    align-items: flex-start;  
    flex-direction: column;
    background: ${({ theme }) => theme.rgba(theme.ruby800, 0.25)};
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

    &::before {
        content: "";
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 0.5rem;
        background: ${({ theme }) => theme.rgba(theme.ruby800, 0.8)};
        display: ${({ hideLeftBorder }) => hideLeftBorder && 'none'};
    }
`;

export const WarningState = styled(ErrorState)`
    background: ${({ theme }) => theme.rgba(theme.gold800, 0.25)};
    border: 1px solid ${({ theme }) => theme.rgba(theme.gold800, 0.8)};
    &::before {
        background: ${({ theme }) => theme.rgba(theme.gold800, 0.8)};
    }
`;

export const InfoState = styled(ErrorState)`
    &::before {
        background: ${({ theme }) => theme.rgba(theme.blue800, 0.8)};
    }
    background: ${({ theme }) => theme.rgba(theme.blue100, 0.2)};
    border-color: ${({ theme }) => theme.rgba(theme.blue100, 0.4)};
`;
