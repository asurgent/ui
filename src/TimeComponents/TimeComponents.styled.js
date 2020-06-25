import styled from 'styled-components';

export const TextSmall = styled.p`
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: ${({ withBottomMargin }) => (withBottomMargin ? '1rem!important' : '0')};
`;

export const TextNormal = styled.h4`
    /* should be poppins-font according to Figma-project */
    display: flex;
    text-align: center;
    margin: 0;
    line-height: 28px;
    letter-spacing: 0.05em;
    font-weight: bold;
`;
