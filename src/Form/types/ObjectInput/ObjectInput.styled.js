import styled from 'styled-components';
import Input from '../../components/InputWrapper';

export const ButtonContainer = styled.div`
    display: flex;
    margin-top: 1.875rem;
    margin-bottom: 1.25rem;
`;

export const HiddenInput = styled.input`
    display: none;
`;

export const InputContainer = styled(Input)`
    margin-bottom: 1.5rem;
`;
/*
export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    input, select {
        border: ${({ theme }) => `1px solid ${theme.gray200}`};
        border-radius: 5px;
    }

    small {
        color: ${({ theme }) => theme.gray700};
        margin-bottom: 0.5rem;
    }
    input, select {
        border-color: ${({ theme, hasError }) => (hasError ? theme.ruby800 : theme.gray200)};
        background: ${({ theme, hasError }) => (hasError ? theme.ruby100 : theme.white)};
    }
`; */

export const Entry = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${theme.gray200}`};
  ${InputContainer} { // :not(:last-child)
      margin-bottom: 1.5rem;
  }
  h5 {
      margin-top: 0;
  }
`;

export const Container = styled.div`
    width: 100%;
    & > * {
        padding: 2rem;
    } 

    ${Entry}:last-child {
        border-bottom: none;
    }
`;

export const Label = styled.small`
   
`;

export const Error = styled.div`
  flex: 1;
  margin-top: 0.25rem;
  font-size: 0.6875rem;
  letter-spacing: 0.0625rem;
  color: ${({ theme }) => theme.ruby800};
  position: absolute; 
  top: 100%;
`;
