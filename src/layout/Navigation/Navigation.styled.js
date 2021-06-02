import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.gray300};
    @media screen and (min-width: ${({ theme }) => `${theme.breakPointDesktop * 10}px`}) {
        border-bottom: none;
    }
`;

export const NavigationItem = styled(NavLink)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    position: relative;
    padding: 0.75rem 1.5rem;
    color: ${({ theme }) => theme.black};
    width: 100%;

    @media screen and (min-width: ${({ theme }) => `${theme.breakPointDesktop * 10}px`}) {
        justify-content: center;
        color: ${({ theme }) => theme.white};
        padding: 1rem 0;
    }

    &:hover {
        background: ${({ theme }) => theme.gray50};
        @media screen and (min-width: ${({ theme }) => `${theme.breakPointDesktop * 10}px`}) {
            background: inherit;
        }
    }

    &.active {
        background: ${({ theme }) => theme.gray100};
        font-weight: 700;
        @media screen and (min-width: ${({ theme }) => `${theme.breakPointDesktop * 10}px`}) {
            background: ${({ theme }) => theme.activeBackground};
            color: ${({ theme }) => theme.activeLinkColor};
        }
    }

    span {
         margin-left: 1rem;

     }
`;

export const DropdownNavigationItem = styled(NavigationItem)`
    &:first-child {
        margin-top: 0.5rem;
    }
    &:hover {
        background: ${({ theme }) => theme.gray50};
        @media screen and (min-width: ${({ theme }) => `${theme.breakPointDesktop * 10}px`}) {
            background: ${({ theme }) => theme.gray50};
        }
    }

   @media screen and (min-width: ${({ theme }) => `${theme.breakPointDesktop * 10}px`}) {
        justify-content: flex-start;
        color: ${({ theme }) => theme.black};
        padding: 0.75rem 1.5rem;
    }

`;
