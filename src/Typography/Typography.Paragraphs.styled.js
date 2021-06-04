import styled from 'styled-components';

export const Main = styled.p`
    font-family: Lato;
    font-size: 1rem;
    font-style: normal;
    text-transform: ${({ capitalize, uppercase, lowercase }) => {
    if (capitalize) return 'capitalize';
    if (uppercase) return 'uppercase';
    if (lowercase) return 'lowercase';
    return 'initial';
  }};
    color: ${({ theme, gray }) => (gray ? theme.gray600 : theme.black)};
    font-weight: ${({ bold }) => (bold ? 700 : 400)};
    line-height: 1.25rem;
    letter-spacing: 0em;
    text-align: left;
    margin: 0.5rem 0 1rem 0;
    padding: 0;
`;

export const Small = styled(Main)`
    line-height: 1.125rem;
    font-size: 0.875rem;
`;
