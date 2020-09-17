import styled from 'styled-components';

export const TextSmall = styled.p`
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    text-transform: uppercase;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 6rem;
    p {
      margin: 0;
    }
    text-align: center;
    color: ${({ hasExpired, theme }) => (hasExpired ? theme.gray600 : theme.black)};
    margin-right: ${({ marginRight }) => marginRight && '2rem'};
    margin-left: ${({ marginLeft }) => marginLeft && '2rem'};
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
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
`;

export const StartDate = styled(Calendar)`
  border-top-color: ${({ hasExpired, theme }) => (hasExpired ? theme.gray600 : theme.green800)};
`;
export const EndDate = styled(Calendar)`
  border-top-color: ${({ hasExpired, theme }) => (hasExpired ? theme.gray600 : theme.ruby800)};
`;

export const Time = styled.div`
  background: ${({ theme }) => theme.white};
  width: 100%;
  padding: 0.2rem 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-top: 4px;
  p {
    font-weight: bold;
  }
`;

export const DateAndTime = styled(Calendar)`
  border-top-color: ${({ theme, active }) => (active ? theme.blue900 : theme.gray600)};
`;
