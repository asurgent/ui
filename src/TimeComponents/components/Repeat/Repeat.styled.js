import styled from 'styled-components';

export const Container = styled.div`
    width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      margin: 0;
    }
    text-align: center;
    color: ${({ theme, expired }) => (expired ? theme.gray600 : theme.black)};
`;
