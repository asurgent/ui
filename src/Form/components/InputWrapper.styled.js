import styled from 'styled-components';
import MdiIcon from '@mdi/react';

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
  @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
    max-width: 700px;
  }
  align-items: center;
  border: 0.0625rem solid;
  border-color: ${({ theme, hasError }) => {
    if (hasError) {
      return theme.ruby800;
    }
    return theme.gray300;
  }};
  border-radius: ${(props) => (props.status === 'error' ? '3px 3px 0px 0px' : '3px')};
  position: relative;
  box-sizing: border-box;
  min-height: 2.9375rem;
  background: ${({ theme, hasError }) => {
    if (hasError) {
      return theme.ruby100;
    }
    return theme.white;
  }};
  
  input,textarea,select {
    font-size: 1rem;
    width: 100%;
    max-width: 100%; 
    border: none;
    outline: none;
    appearance: none; 
    text-overflow: ellipsis;
    padding: ${({ type }) => {
    if (type === 'radiogroup') {
      return '0 0.75rem';
    }
    return '0.75rem';
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
    padding-right: 2rem;
    background: transparent;
  }

  .down-arrow {
    position:absolute;
    right: 0.5rem;
  }
  
  .transparentBackground {
    background: transparent!important;
    border-color: ${({ theme }) => theme.gray200}!important;
  }  
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

export const Header = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
    max-width: 700px;
  }
  justify-content: space-between;
`;

export const TooltipIcon = styled(MdiIcon)`
  color: ${({ theme }) => theme.gray700};
  cursor: pointer;
`;
