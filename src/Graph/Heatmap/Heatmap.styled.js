import styled from 'styled-components';

export const Tooltip = styled.div`
     opacity: 0;
     background-color: ${({ theme }) => theme.black};
     color: ${({ theme }) => theme.white};
     position: fixed;
     border-radius: 5px;
     padding: 10px;
     user-select: none;
     pointer-events: none;
     font-size: 0.75rem;

     &:after {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: ${({ theme }) => `10px solid ${theme.black}`};
        content: '';
        position: absolute;
        top: 100%;
        left: calc(50% - 10px);
     }
`;

export const Group = styled.g`
    user-select: none;
`;
