import styled from 'styled-components';

export const Dismiss = styled.div`
  cursor: pointer;
`;

export const Container = styled.div`
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 2rem;
   

    h3 {
        margin: 0;
    }
`;

export const ContainerPrimary = styled(Container)`
    color: ${({ theme }) => theme.white};
    fill: ${({ theme }) => theme.gold800};
    background: ${({ theme }) => theme.blue900};
    border: 0.0625rem solid ${({ theme }) => theme.blue900};
    margin-bottom: ${({ withBottomMargin }) => (withBottomMargin ? '1rem' : '0')};
`;

export const ContainerPlain = styled(Container)`
    fill: ${({ theme }) => theme.gray300};
    color: ${({ theme }) => theme.black};
    background: ${({ theme }) => theme.white};
    border: 0.0625rem solid ${({ theme }) => theme.gray300};
    margin-bottom: ${({ withBottomMargin }) => (withBottomMargin ? '1rem' : '0')};
`;

export const IconHolder = styled.div`
    display: flex;
    align-items: center;
    margin-right: 2.9375rem;
    font-size: 1.375rem;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;
