import styled from 'styled-components';

export const BaseBlock = styled.div`
    position: relative;
    width: ${({ autoWidth }) => (autoWidth ? 'auto' : '100%')};
    display: flex;
    flex-direction: column;
    margin: ${({ withMargins }) => (withMargins ? '1.6rem' : 0)};
    margin-bottom: ${({ withBottomMargin }) => (withBottomMargin ? '1.6rem' : 0)};
    padding: ${({ withPadding }) => (withPadding ? '1.6rem' : 0)};
    background: ${({ renderTransparent, theme }) => (renderTransparent === true ? 'transparent' : theme.white)};
    color: ${({ theme }) => theme.black};
    
    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointMobile * 10}px`}) {
        padding: ${({ withPadding }) => (withPadding ? '3.2rem' : 0)};
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

export const Bordered = styled(BaseBlock)`
    background: ${({ theme }) => theme.white};
    filter: drop-shadow(0 1px 6px ${({ theme }) => theme.rgba(theme.black, 0.2)});
    border-radius: 5px;
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

export const Emptystate = styled(BaseBlock)`
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const ErrorState = styled(BaseBlock)`
    justify-content: center;
    align-items: flex-start;
    padding: 1.6rem !important;
    flex-direction: column;
    background: ${({ theme }) => theme.rgba(theme.ruby800, 0.25)};
    border: 1px solid ${({ theme }) => theme.rgba(theme.ruby800, 0.8)};
    border-radius: 5px;

    > b.title {
        margin-bottom: 1.6rem;
    }

    p {
        margin: 0;
        padding: 0;
    }

    &::before {
        content: "";
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: .8rem;
        background: ${({ theme }) => theme.rgba(theme.ruby800, 0.8)};
        display: ${({ hideLeftBorder }) => hideLeftBorder && 'none'};
    }
`;

export const WarningState = styled(ErrorState)`
    background: ${({ theme }) => theme.rgba(theme.gold800, 0.25)};
    border: 1px solid ${({ theme }) => theme.rgba(theme.gold800, 0.8)};
    &::before {
        background: ${({ theme }) => theme.rgba(theme.gold800, 0.8)};
    }
`;

export const InfoState = styled(ErrorState)`
    &::before {
        background: ${({ theme }) => theme.rgba(theme.blue800, 0.8)};
    }
    background: ${({ theme }) => theme.rgba(theme.blue100, 0.2)};
    border-color: ${({ theme }) => theme.rgba(theme.blue100, 0.4)};
`;
