import styled from 'styled-components';

export const H1 = styled.h1`
    font-family: "Poppins";
    font-size: 1.5rem;
    font-style: normal;
    font-weight:${({ bold }) => (bold ? 500 : 400)};
    line-height: 1.75rem;
    letter-spacing: 0;
    text-align: left;
    margin: 0;
    padding: 1rem 0 1.5rem 0;
    border-top: ${({ theme, borderTop }) => borderTop && `1px solid ${theme.gray300}`};
    border-bottom: ${({ theme, borderBottom }) => borderBottom && `1px solid ${theme.gray300}`};
    text-transform: ${({ capitalize, uppercase, lowercase }) => {
    if (capitalize) return 'capitalize';
    if (uppercase) return 'uppercase';
    if (lowercase) return 'lowercase';
    return 'initial';
  }};
`;

export const H2 = styled.h2`
    font-family: "Poppins";
    font-style: normal;
    font-size: 1.375rem;
    line-height: 1.625rem;
    font-weight: 400;
    letter-spacing: 0;
    text-align: left;
    font-weight:${({ bold }) => (bold ? 500 : 400)};
    line-height: 1.5rem;
    margin: 0;
    padding: 0;
    margin-bottom: 0.5rem;
    border-top: ${({ theme, borderTop }) => borderTop && `1px solid ${theme.gray300}`};
    border-bottom: ${({ theme, borderBottom }) => borderBottom && `1px solid ${theme.gray300}`};
    text-transform: ${({ capitalize, uppercase, lowercase }) => {
    if (capitalize) return 'capitalize';
    if (uppercase) return 'uppercase';
    if (lowercase) return 'lowercase';
    return 'initial';
  }};
`;

export const H3 = styled.h3`
    font-family: "Poppins";
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem;
    letter-spacing: 0;
    text-align: left;
    font-weight:${({ bold }) => (bold ? 500 : 400)};
    line-height: 1.5rem;
    margin: 0;
    padding: 0;
    margin-bottom: 0.5rem;
    border-top: ${({ theme, borderTop }) => borderTop && `1px solid ${theme.gray300}`};
    border-bottom: ${({ theme, borderBottom }) => borderBottom && `1px solid ${theme.gray300}`};
    text-transform: ${({ capitalize, uppercase, lowercase }) => {
    if (capitalize) return 'capitalize';
    if (uppercase) return 'uppercase';
    if (lowercase) return 'lowercase';
    return 'initial';
  }};
`;
