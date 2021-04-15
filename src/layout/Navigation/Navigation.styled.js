import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    padding: .8rem 0;
    border-bottom: 1px solid ${({ theme }) => theme.gray300};
    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
        border-bottom: none;
    }
`;

export const NavigationItem = styled(NavLink)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    position: relative;
    padding: 1.2rem 2.4rem;
    color: ${({ theme }) => theme.black};
    width: 100%;

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
        justify-content: ${({ isDropdownItem }) => (isDropdownItem ? 'flex-start' : 'center')};
        color: ${({ theme, isDropdownItem }) => (isDropdownItem ? theme.black : theme.white)};
        padding: ${({ isDropdownItem }) => (isDropdownItem ? '1.2rem 2.4rem' : '1.6rem 0')};
    }

    &:hover {
        background: ${({ theme }) => theme.gray50};
        @media screen and (min-width: ${({ theme, isDropdownItem }) => !isDropdownItem && `${theme.breakPointDesktop * 10}px`}) {
            background: inherit;
        }
    }

    &.active {
        background: ${({ theme }) => theme.gray100};
        font-weight: 700;
        @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
            background: ${({ theme }) => theme.activeBackground};
            color: ${({ theme }) => theme.activeLinkColor};
        }
    }

    span {
         margin-left: 1.6rem;

     }
`;
