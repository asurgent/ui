// @import '../node_modules/mapbox-gl/dist/mapbox-gl.css';
import { createGlobalStyle } from 'styled-components';

const Normalize = createGlobalStyle`
    html {
        overflow-x: hidden;
    }

    body {
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
/* 
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

    button {
    font-size: 1.4rem;
    line-height: 1.8rem;
    letter-spacing: 0.12rem;
    } */
`;

export default Normalize;
