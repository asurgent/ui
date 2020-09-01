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

export const Dots = styled.div`
  transform: translateY(1.6rem);
  display: flex;
`;

export const DateAndTime = styled.div`
  width: 6rem;
  height: 6rem;
  border-top: 0.8rem solid #133A5D;
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
