import styled from 'styled-components';

export const Text = styled.div`
    padding: ${({ hasOverride }) => !hasOverride && '2rem'};
    overflow: hidden;
    cursor: ${({ isOpen }) => (isOpen ? 'default' : 'pointer')};
`;

export const Arrow = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid ${({ theme }) => theme.gray200};
    
    svg {
        transition: transform 0.2s ease;
        transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')}
    }

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointTablet * 10}px`}) {
        border-left: 1px solid ${({ theme }) => theme.gray200};
        border-top: none;
    }
`;

export const Content = styled.div`
    padding: 2rem;
    border-top: 1px solid ${({ theme }) => theme.gray200};
    background: ${({ theme }) => theme.gray50};
`;

export const Wrapper = styled.div`
    background: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.gray100};
    box-sizing: border-box;
    box-shadow: ${({ compact }) => (compact ? 'none' : '0px 5px 7px rgba(0, 0, 0, 0.1)')};
    margin-bottom: ${({ compact }) => (compact ? '0' : '1rem')};
    width: 100%;
    display: grid;
    overflow: hidden;
    grid-template-rows: 1fr auto 3.125rem;
    grid-template-columns: 1fr;
    grid-template-areas: 
        "text"
        "content"
        "arrow";

    ${Text} {
        grid-area: text;
    }

    ${Arrow} {
        grid-area: arrow;
    }

    .content {
        grid-area: content;
    }

    :first-of-type {
        margin-top: 1rem;
    }

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointTablet * 10}px`}) {
        grid-template-rows: 1fr auto;
        grid-template-columns: 1fr 9.375rem;
        grid-template-areas: 
            "text arrow"
            "content content";
    }   
`;

export const Ellipsis = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Title = styled(Ellipsis)`
    font-family: "Poppins";
    font-weight: 500;
    font-size: 1rem;
    overflow:hidden;
`;

export const Description = styled(Ellipsis)`
    font-family: "Lato";
    font-size: 1rem;
    overflow:hidden;
`;
