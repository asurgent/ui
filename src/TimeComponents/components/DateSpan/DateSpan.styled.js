import styled from 'styled-components';

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

export const Container = styled.div`
    margin-right: 3.6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    p {
      margin: 0;
    }
    text-align: center;
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
