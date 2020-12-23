import styled from 'styled-components';

export const Wrapper = styled.div`
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    border-top: 1px solid ${({ theme, borderTop }) => (borderTop ? theme.gray300 : 'transprent')};
    border-bottom: 1px solid ${({ theme, borderBottom }) => (borderBottom ? theme.gray300 : 'transprent')};
`;

export const Title = styled.div`
    padding: 1.6rem 1.6rem 1.6rem 0;
    font-family: "Poppins";
    font-style: normal;
    font-weight: normal;
    font-size: 1.2rem;
    text-transform: uppercase;
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid ${({ theme }) => theme.gray300};
    word-break: break-all;
    min-width: 8rem;
    flex-wrap: wrap;
    align-items: center;
`;

export const Value = styled(Title)`
    word-break: break-all;
    font-family: "Lato";
    font-size: 1.6rem;
    text-transform: unset;
`;

export const NoValue = styled(Value)`
    color: ${({ theme }) => theme.gray300};
    font-size: 1.4rem;
`;

export const Row = styled.div`
    padding: 0;
    display: flex;
    grid-column: 1/-1;
    border-bottom: 1px solid ${({ theme }) => theme.gray300};
`;
