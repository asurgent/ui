import styled from 'styled-components';


export const Wrapper = styled.div`
    background: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.gray100};
    box-sizing: border-box;
    box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.1);
    margin: 1.6rem 0;
    width: 100%;
`;

export const Peek = styled.div`
    display: grid;
    grid-template-columns: 1fr 15rem;
`;

export const Ellipsis = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Title = styled(Ellipsis)`
    font-family: "Poppins";
    font-weight: 500;
    font-size: 1.6rem;
    overflow:hidden;
`;

export const Description = styled(Ellipsis)`
    font-family: "Lato";
    font-size: 1.6rem;
    overflow:hidden;
`;

export const Text = styled.div`
    padding: 3.2rem;
    overflow: hidden;
`;

export const Arrow = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid ${({ theme }) => theme.gray200};
    
    svg {
        transition: transform 0.2s ease;
        transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')}
    }
`;


export const Content = styled.div`
    padding: 3.2rem;
    border-top: 1px solid ${({ theme }) => theme.gray200};
    background: ${({ theme }) => theme.gray50};
`;
