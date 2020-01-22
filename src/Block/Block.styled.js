import styled from 'styled-components';

const base = styled.div`
    position: relative;
    width: ${({ autoWidth }) => (autoWidth ? 'auto' : '100%')};
    display: flex;
    flex-direction: column;
    margin: ${({ withMargins }) => (withMargins ? '1.6rem' : 0)};
    padding: ${({ withPadding }) => (withPadding ? '3.2rem' : 0)};
    background: ${({ renderTransparent, theme }) => (renderTransparent === true ? 'transparent' : theme.white)};
    color: ${({ theme }) => theme.black};
`;

export const Left = styled(base)`
    align-items: flex-start;
`;

export const Center = styled(base)`
    align-items: center;
`;

export const Right = styled(base)`
    align-items: flex-end;
`;

export const Plain = styled(base)`
    align-items: flex-start;
`;

export const Bordered = styled(base)`
    background: ${({ theme }) => theme.white};
    filter: drop-shadow(0 1px 6px ${({ theme }) => theme.rgba(theme.black, 0.2)});
    border-radius: 5px;
`;

export const SpaceBetween = styled(base)`
    justify-content: space-between;
    flex-direction: row;
    align-items: unset;
`;

export const Wrap = styled(base)`   
    flex-wrap: wrap;
    flex-direction: unset;
`;

export const Emptystate = styled(base)`
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const Errorstate = styled(base)`
    justify-content: center;
    align-items: flex-start;
    padding: 1.6rem;
    flex-direction: column;
    background: ${({ theme }) => theme.rgba(theme.ruby800, 0.25)};;
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
    }
`;
