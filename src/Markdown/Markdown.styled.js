import styled from 'styled-components';
import githubMarkdownCss from 'github-markdown-css';

export const Markdown = styled.div`
    min-width: 100%;
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    
    ${githubMarkdownCss};

    * {
        background: transparent !important;   
    }
`;
