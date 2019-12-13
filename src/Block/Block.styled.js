import styled from 'styled-components';

const base = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: ${({ withMargins }) => (withMargins ? '1.6rem' : 0)};
    padding: ${({ withPadding }) => (withPadding ? '1.6rem' : 0)};
    background: ${({ theme }) => theme.white};
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
