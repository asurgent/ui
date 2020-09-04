import styled from 'styled-components';

export const StartEnd = styled.div`
    width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      margin: 0;
    }
    text-align: center;
`;

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
`;
export const Dates = styled.div`
    display: flex;
    align-items: center;
`;

export const Dots = styled.div`
  display: flex;
  transform: translateY(1.6rem);
`;

export const Calendar = styled.div`
  width: 6rem;
  height: 6rem;
  border-top: 0.8rem solid #133A5D;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
`;

export const DateAndTime = styled.div`
  width: 6rem;
  height: 6rem;
  border-top: 0.8rem solid;
  border-top-color: ${({ theme, active }) => (active ? theme.blue900 : theme.gray600)};
  border-radius: 5px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
`;

export const Time = styled.div`
  background: 'white';
  padding: 0.2rem 0.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-top: 4px;
  p {
    font-weight: bold;
  }
`;
