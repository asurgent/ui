import { createGlobalStyle } from 'styled-components';

const Normalize = createGlobalStyle`
    html {
        overflow-x: hidden;
        font-size: 100%;
    }

    body {
        font-size: 1rem;
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
`;

export default Normalize;
