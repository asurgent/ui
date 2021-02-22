import styled from 'styled-components';

export const Main = styled.p`
    font-family: Lato;
    font-size: 1.6rem;
    font-style: normal;
    text-transform: ${({ capitalize, uppercase, lowercase }) => {
    if (capitalize) return 'capitalize';
    if (uppercase) return 'uppercase';
    if (lowercase) return 'lowercase';
    return 'initial';
  }};
    color: ${({ theme, gray }) => (gray ? theme.gray600 : theme.black)};
    font-weight: ${({ bold }) => (bold ? 700 : 400)};
    line-height: 2rem;
    letter-spacing: 0em;
    text-align: left;
    margin: .8rem 0 1.6rem 0;
    padding: 0;
`;

export const Small = styled(Main)`
    line-height: 1.8rem;
    font-size: 1.4rem;
`;
