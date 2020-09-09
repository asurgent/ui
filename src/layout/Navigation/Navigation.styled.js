import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items:  flex-start;
    width: 100%;
`;

export const NavigationItem = styled(NavLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    position: relative;
    margin: ${({ theme }) => (theme.menuItemsSpacing || '0')} 0;
    padding: ${({ theme }) => (theme.menuItemsSpacing || '1.6rem 0')};
    font-size: ${({ theme }) => (theme.menuFontSize || 'inherit')};
    color: ${({ theme }) => theme.linkColor};
    width: 100%;

    &.active {
        background: ${({ theme }) => theme.activeBackground};
        color: ${({ theme }) => theme.activeLinkColor};
    }

    span {
         margin-left: 1.6rem;

     }
`;
