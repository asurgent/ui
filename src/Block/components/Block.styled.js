import styled from 'styled-components';

export const BaseBlock = styled.div`
    position: relative;
    width: ${({ autoWidth }) => (autoWidth ? 'auto' : '100%')};
    display: flex;
    flex-direction: column;
    margin: ${({ withMargins, withBottomMargin }) => {
    if (withMargins) {
      return '1rem';
    }
    if (withBottomMargin) {
      return '0 0 1rem 0';
    }
    return '0';
  }};
    padding: ${({ withPadding }) => (withPadding ? '1rem' : 0)};
    background: ${({ renderTransparent, theme }) => (renderTransparent === true ? 'transparent' : theme.white)};
    
    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointMobile * 10}px`}) {
        padding: ${({ withPadding }) => (withPadding ? '2rem' : 0)};
    }
`;

export const Left = styled(BaseBlock)`
    align-items: flex-start;
`;

export const Center = styled(BaseBlock)`
    align-items: center;
`;

export const Right = styled(BaseBlock)`
    align-items: flex-end;
`;

export const Plain = styled(BaseBlock)`
    align-items: flex-start;
`;

export const Stretch = styled(BaseBlock)`
    align-items: stretch;
`;

export const Bordered = styled(BaseBlock)`
    border-radius: 5px;
    background: ${({ theme }) => theme.white};
    filter: ${({ theme, noShadow }) => (noShadow ? 'none' : `drop-shadow(0 1px 6px ${theme.rgba(theme.black, 0.2)})`)};
    border: ${({ theme, noShadow }) => (noShadow ? `1px solid ${theme.gray300}` : 'none')};
`;

export const SpaceBetween = styled(BaseBlock)`
    justify-content: space-between;
    flex-direction: row;
    align-items: unset;
`;

export const Wrap = styled(BaseBlock)`   
    flex-wrap: ${({ wrapReverse }) => (wrapReverse === true ? 'wrap-reverse' : 'wrap')};
    flex-direction: unset;
`;

export const WrapGrid = styled(BaseBlock)`
    display: grid;
    grid-template-columns: ${({ columnMinWidth }) => `repeat(auto-fit, minmax(${columnMinWidth || 200}px, 1fr))`};
    grid-gap: ${({ gridGap }) => (gridGap ? `${gridGap}px` : '0')};
    align-items: ${({ stretchColumns }) => (stretchColumns ? 'stretch' : 'start')};
`;
