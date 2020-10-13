import styled from 'styled-components';

export const H1 = styled.h1`
    font-family: "Poppins";
    font-size: 2.4rem;
    font-style: normal;
    font-weight:${({ bold }) => (bold ? 500 : 400)};
    line-height: 2.8rem;
    letter-spacing: 0;
    text-align: left;
    margin: 0;
    padding: 1.6rem 0 2.4rem 0;
    border-top: ${({ theme, borderTop }) => borderTop && `1px solid ${theme.gray300}`};
    border-bottom: ${({ theme, borderBottom }) => borderBottom && `1px solid ${theme.gray300}`};
`;

export const H2 = styled.h2`
    font-family: "Poppins";
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.4rem;
    letter-spacing: 0;
    text-align: left;
    font-weight:${({ bold }) => (bold ? 500 : 400)};
    line-height: 2.4rem;
    margin: 0;
    padding: 0;
    margin-bottom: .8rem;
    border-top: ${({ theme, borderTop }) => borderTop && `1px solid ${theme.gray300}`};
    border-bottom: ${({ theme, borderBottom }) => borderBottom && `1px solid ${theme.gray300}`};
`;
