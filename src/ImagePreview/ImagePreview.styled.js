import styled from 'styled-components';

export const SmallImage = styled.div`
    width: ${({ smallIconSize }) => smallIconSize};
    height: ${({ smallIconSize }) => smallIconSize};
    
    filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.2));
    border-radius: 5px;
    cursor: pointer;
    margin: 3rem 1.6rem 3rem 0;
    display: flex;
    justify-content: center;
    align-items:center;
    color: ${({ theme }) => theme.ruby800};
    background: white;
    overflow: hidden;

    img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
`;

export const LargeImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.2));
    cursor: pointer;
    overflow: hidden;
    img {
        object-fit: cover;
        max-width: 100%;

        @media (min-width: 768px) {
            max-width: 80vw;
            max-height: 80vh;
        }
    }
`;
