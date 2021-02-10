import styled from 'styled-components';

export const Title = styled.div`
    font-family: "Poppins";
    font-style: normal;
    font-weight: normal;
    font-size: 1.2rem;
    text-transform: uppercase;
    display: flex;
    align-items: flex-start;
    word-break: break-all;
    min-width: 8rem;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.gray300};
    &:nth-last-child(1), &:nth-last-child(2){
        border-bottom-color: ${({ theme, borderBottom }) => (borderBottom ? theme.gray300 : 'transparent')}
    }
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

export const Wrapper = styled.div`
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    border-top: 1px solid ${({ theme, borderTop }) => (borderTop ? theme.gray300 : 'transparent')};
    border-bottom: 1px solid ${({ theme, borderBottom }) => (borderBottom ? theme.gray300 : 'transparent')};

    ${Title} {
        padding: ${({ compact }) => (compact ? '.4rem .4rem .4rem 0 ' : '1.6rem 1.6rem 1.6rem 0')};
    }
`;

export const Row = styled.div`
    padding: 0;
    display: flex;
    grid-column: 1/-1;
    border-bottom: 1px solid ${({ theme }) => theme.gray300};
`;
