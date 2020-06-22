import styled from 'styled-components';

export const Date = styled.div`
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

export const NextDate = styled.div`
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
export const StartDate = styled(NextDate)`
  border-top: 0.8rem solid #13BE69;
`;
export const EndDate = styled(NextDate)`
  border-top: 0.8rem solid #C6403B;
`;
export const ExpiredDate = styled(NextDate)`
   border-top: 0.8rem solid #6E6E6E;
`;
