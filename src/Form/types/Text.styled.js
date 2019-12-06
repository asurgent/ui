
import styled from 'styled-components';

export const Main = styled.div`
  width: 100%;
  max-width: 100%; 
  display: flex;
  flex-direction: column;
  margin-bottom: 1.6rem;
`;

export const Wrapper = styled.div`
  margin: 0;
  border: 0.1rem solid;
  border-color: ${({ theme }) => theme.gray200};
  border-radius: ${prop => (prop.status === 'error' ? '5px 5px 0px 0px' : '5px')};
  padding: 1.2rem;
  position: relative;
  box-sizing: border-box;
  min-height: 4.7rem;

  input,textarea, select {
    width: 100%;
    max-width: 100%; 
    border: none;
    outline: none;
    appearance: none; 

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

export const Icon = styled.i`
  width: 1.6rem;
  text-align: right;
  color: ${({ theme }) => theme.gray700};
  cursor: pointer;
`;

const arrowSvg = theme => encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="292.4" height="292.4">
  <path
    fill="${theme.gray500}" 
    d="M287 69.4a17.6 17.6 0 0 0-13-5.4H18.4c-5 0-9.3 1.8-12.9 5.4A17.6 17.6 0 0 0 0 82.2c0 5 1.8 9.3 5.4 12.9l128 127.9c3.6 3.6 7.8 5.4 12.8 5.4s9.2-1.8 12.8-5.4L287 95c3.5-3.5 5.4-7.8 5.4-12.8 0-5-1.9-9.2-5.5-12.8z"/>
</svg>`);

export const SelectWrapper = styled(Wrapper)`
  padding: 0;
  background-image: url('data:image/svg+xml;charset=US-ASCII, ${({ theme }) => arrowSvg(theme)}');
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
  
  select {
    padding: 1.2rem 0 1.2rem 1.2rem;
  }
`;
