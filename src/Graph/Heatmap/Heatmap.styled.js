import styled from 'styled-components';

export const Tooltip = styled.div`
     opacity: 0;
     background-color: ${({ theme }) => theme.gray800};
     color: ${({ theme }) => theme.gray100};
     position: fixed;
     border-radius: 5px;
     padding: 10px;
     user-select: none;
     pointer-events: none;

     &:after {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: ${({ theme }) => `10px solid ${theme.gray800}`};
        content: '';
        position: absolute;
        top: 100%;
        left: calc(50% - 10px);
     }
`;

export const Group = styled.g`
    user-select: none;
`;
