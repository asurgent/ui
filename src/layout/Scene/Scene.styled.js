import styled from 'styled-components';
import { BaseBlock } from '../../Block/Block.styled';

export const Scene = styled.div`
    background: ${({ theme }) => theme.white};
    position: relative;
    overflow-y: auto;
    overflow-x: auto;
    height: 100%;
    max-height: 100%;
    min-height: 100%;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    margin-top: 1.6rem;
    

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
        margin-top: 0;
    }

    > ${BaseBlock}:last-of-type {
        margin-bottom: 3.2rem;
    }
`;
