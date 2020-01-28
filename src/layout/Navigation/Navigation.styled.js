import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items:  flex-start;
`;

export const NavigationItem = styled.div`
    position: relative;
    margin: ${({ theme }) => (theme.menuItemsSpacing || '.5rem')} 0;
    padding: ${({ theme }) => (theme.menuItemsSpacing || '.5rem')};
    background: ${({ active, theme }) => (active ? theme.activeBackground : 'transparent')};
    border-radius: 2px;
    font-size: ${({ theme }) => (theme.menuFontSize || 'inherit')};
    
    > *, a {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: ${({ active, theme }) => (active ? theme.activeLinkColor : theme.linkColor)};
        
        span {
            margin-lefT: 1.6rem;
        }
    }
    
`;
