import styled from 'styled-components';

export const Pagination = styled.div`
    position: relative;
    display: flex;
    align-items:center;
    justify-content: flex-end;
    margin-top: 1.6rem;

    &:after {
      display: ${({ isLoading }) => (isLoading ? 'block' : 'none')};
      position: absolute;
      content: "";
      background: ${({ theme }) => theme.rgba(theme.white, 0.8)};
      left: 0;
      right: 0;
      top: 0;
      bottom:0;
    }
`;

export const Page = styled.div`
    display: flex;
    cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
    width: 3.2rem;
    height: 3.2rem;
    justify-content: center;
    align-items: center;
    margin-left: .8rem;
    font-size:1.2rem;
    font-weight: 600;
    border: 1px solid;
    border-color: ${({ theme, activePage }) => (activePage ? theme.rgba(theme.gray100, 1) : 'transparent')};
    background: ${({ theme, activePage }) => (activePage ? theme.rgba(theme.gray100, 1) : theme.white)};
    font-weight: ${({ activePage }) => (activePage ? '700' : '400')};
    color: ${({ theme }) => theme.gray800};
    border-radius: 100%;

    &:hover {
      border-color: ${({ theme, isClickable }) => (isClickable ? theme.rgba(theme.gray100, 1) : 'transparent')};
      background: ${({ theme, isClickable }) => (isClickable ? theme.rgba(theme.gray100, 1) : 'transparent')};
    }
`;
