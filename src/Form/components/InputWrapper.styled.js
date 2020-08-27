import styled from 'styled-components';
import HelpOutline from '@material-ui/icons/HelpOutline';

export const Main = styled.div`
  width: 100%;
  max-width: 100%; 
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Wrapper = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  border: .1rem solid;
  border-color: ${({ theme, hasError }) => {
    if (hasError) {
      return theme.ruby800;
    }
    return theme.gray200;
  }};
  border-radius: ${(props) => (props.status === 'error' ? '5px 5px 0px 0px' : '5px')};
  position: relative;
  box-sizing: border-box;
  min-height: 4.7rem;
  background: ${({ theme, hasError }) => {
    if (hasError) {
      return theme.ruby100;
    }
    return theme.white;
  }};
  
  input,textarea,select {
    width: 100%;
    max-width: 100%; 
    border: none;
    outline: none;
    appearance: none; 
    padding: ${({ type }) => {
    if (type === 'radiogroup') {
      return '0 1.2rem';
    }
    return '1.2rem';
  }};
    
    &:disabled {
        color: ${({ theme }) => theme.gray400};
    }

    &::placeholder {
      opacity: 0.4
    }
    
    &:focus,
    &.hasValue {
      outline: none;
    }
  }
  textarea { 
    resize: vertical; 
  }
  select {
    z-index: 1;
    padding-right: 3.2rem;
    background: transparent;
  }

  .down-arrow {
    position:absolute;
    right: .8rem;
  }
  
  
`;

export const Label = styled.div`
  flex: 1;
  font-size: 1.4rem;
  letter-spacing: .1rem;
  color: ${({ theme }) => theme.gray700};
  text-transform: capitalize;
`;

export const Error = styled.div`
  flex: 1;
  margin-top: .4rem;
  font-size: 1.1rem;
  letter-spacing: .1rem;
  color: ${({ theme }) => theme.ruby800};
  position: absolute; 
  top: 100%;
`;

export const Header = styled.div`
  margin-bottom: .8rem;
  display: flex;
`;

export const TooltipIcon = styled(HelpOutline)`
  color: ${({ theme }) => theme.gray700};
  cursor: pointer;
`;
