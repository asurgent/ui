import styled from 'styled-components';

export const TextSmall = styled.p`
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: ${({ withBottomMargin }) => (withBottomMargin ? '1rem!important' : '0')};
`;

export const TextNormal = styled.h4`
    display: flex;
    text-align: center;
    margin: 0;
    line-height: 28px;
    letter-spacing: 0.05em;
    font-weight: bold;
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
    color: ${({ hasExpired, theme }) => (hasExpired ? theme.gray600 : theme.black)};
`;

export const Dates = styled.div`
    display: flex;
    align-items: center;
`;

export const Calendar = styled.div`
  width: 6rem;
  height: 6rem;
  border-top: 0.8rem solid;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
`;

export const StartDate = styled(Calendar)`
  border-top-color: ${({ active, theme }) => (active ? theme.green800 : theme.gray600)};
`;
export const EndDate = styled(Calendar)`
  border-top-color: ${({ active, theme }) => (active ? theme.ruby800 : theme.gray600)};
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
