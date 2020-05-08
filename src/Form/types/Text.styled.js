
import styled from 'styled-components';
import HelpOutline from '@material-ui/icons/HelpOutline';

export const Main = styled.div`
  width: 100%;
  max-width: 100%; 
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  margin: 0;
  border: 0.1rem solid;
  border-color: ${({ theme }) => theme.gray200};
  border-radius: ${(props) => (props.status === 'error' ? '5px 5px 0px 0px' : '5px')};
  padding: 1.2rem;
  position: relative;
  box-sizing: border-box;
  min-height: 4.7rem;
  background: ${({ theme }) => theme.white};
  
  input,textarea,select {
    width: 100%;
    max-width: 100%; 
    border: none;
    outline: none;
    appearance: none; 
    
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
`;

export const Label = styled.div`
  flex: 1;
  font-size: 1.4rem;
  letter-spacing: .1rem;
  color: ${({ theme }) => theme.gray700};
  text-transform: capitalize;
`;

export const Header = styled.div`
  margin-bottom: .8rem;
  display: flex;
`;

export const TooltipIcon = styled(HelpOutline)`
  color: ${({ theme }) => theme.gray700};
  cursor: pointer;
`;

export const SelectWrapper = styled(Wrapper)`
  padding: 0;
  display: flex;
  position: relative;
  grid-template-columns:  1fr 3rem;
  justify-content: center;
  align-items: center;
  
  .down-arrow {
    position:absolute;
    right: .8rem;
  }
  
  select {
    z-index: 1;
    padding: 1.2rem;
    padding-right: 3.2rem;
    background: transparent;
  }
`;
