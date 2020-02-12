import styled from 'styled-components';
import * as Button from '../../Button/Button.styled';

export const Wrapper = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: auto;
    justify-content: flex-start;
    align-items: center;
    flex-flow: wrap;

    ${Button.Plain} {
        span {
            display: flex;
            justify-content: center;
            align-items: center;
            color:  ${({ theme }) => theme.gray700};

            svg {
                color:  ${({ theme }) => theme.black};
                margin-right: .8rem;
            }
        }
    }
`;

export const Filters = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
`;
