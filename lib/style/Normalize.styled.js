// @import '../node_modules/mapbox-gl/dist/mapbox-gl.css';
import { createGlobalStyle } from 'styled-components';

const Normalize = createGlobalStyle`
    html {
    overflow-x: hidden;
    font-size: 62.5%;
    @media (min-width: 768px) {
        font-size: calc(62.5%);
    }
    @media (min-width: 1024px) {
        font-size: calc(62.5%);
    }
    @media (min-width: 1920px) {
        font-size: calc(62.5% * 1.2);
    }
    @media (min-width: 2560px) {
        font-size: calc(62.5% * 1.4);
    }
    @media (min-width: 3840px) {
        font-size: calc(62.5% * 1.6);
    }
    }
    body {
    font-size: 1.6rem;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    max-width: 100vw;
    overflow-x: hidden;
    width: 100vw;
    margin: 0;
    padding: 0;
    font-family: 'Lato', sans-serif;
    }

    * {
    outline: none;
    text-decoration: none;
    box-sizing: border-box;
    }

    *:focus {
    outline: none;
    }

    input,
    select,
    label,
    textarea,
    button {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: inherit;
    &::-ms-clear {
        display: none;
    }
    }
    p {
    margin-bottom: 1.25em;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
    margin: 2.75rem 0;
    font-weight: 400;
    line-height: 1.15rem;
    }
    pre {
    font-size: 1.2rem;
    }

    h1 {
    margin-top: 0;
    font-size: 3.244rem;
    line-height: 5.1rem;
    }

    h2 {
    font-size: 2.883rem;
    line-height: 4.6rem;
    }

    h3 {
    font-size: 2.563rem;
    line-height: 4.3rem;
    }

    h4 {
    font-size: 2.278rem;
    line-height: 3.8rem;
    }

    h5 {
    font-size: 2.025rem;
    line-height: 3.4rem;
    }

    h6 {
    font-size: 1.8rem;
    line-height: 3.1rem;
    }

    small,
    .text_small {
    font-size: 1.422rem;
    line-height: 1.8rem;
    }

    button {
    font-size: 1.4rem;
    line-height: 1.8rem;
    letter-spacing: 0.12rem;
    }
`;


export default Normalize;
