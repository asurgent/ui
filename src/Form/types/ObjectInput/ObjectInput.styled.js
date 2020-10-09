import styled from 'styled-components';

export const ButtonContainer = styled.div`
    display: flex;
    margin-top: 3rem;
    margin-bottom: 2rem;
`;

export const HiddenInput = styled.input`
    display: none;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    input {
        border: ${({ theme }) => `1px solid ${theme.gray200}`};
        border-radius: 5px;
    }
    small {
        font-weight: bold;     
    }
`;

export const Entry = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${theme.gray200}`};
  ${InputContainer}:not(:first-child) {
      margin-top: 1.2rem;
  }
  h5 {
      margin-top: 0;
  }
`;

export const Container = styled.div`
    width: 100%;
    & > * {
        padding: 3.2rem;
    } 

    ${Entry}:last-child {
        border-bottom: none;
    }
`;
