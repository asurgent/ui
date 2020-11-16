import styled from 'styled-components';

export const Main = styled.p`
    font-family: Lato;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    margin: .8rem 0 1.6rem 0;
    padding: 0;
`;

export const Secondary = styled(Main)`
    color: ${({ theme }) => theme.gray600};
`;
