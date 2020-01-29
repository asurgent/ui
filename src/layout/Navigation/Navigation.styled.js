import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items:  flex-start;
`;

export const NavigationItem = styled(NavLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    position: relative;
    margin: ${({ theme }) => (theme.menuItemsSpacing || '.5rem')} 0;
    padding: ${({ theme }) => (theme.menuItemsSpacing || '.5rem')};
    border-radius: 3px;
    font-size: ${({ theme }) => (theme.menuFontSize || 'inherit')};
    color: ${({ theme }) => theme.linkColor};

    &.active {
        background: ${({ theme }) => theme.activeBackground};
        color: ${({ theme }) => theme.activeLinkColor};
    }

    span {
         margin-left: 1.6rem;
         
     }   
`;
