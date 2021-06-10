import styled from 'styled-components';

export const Pagination = styled.div`
    position: relative;
    display: flex;
    align-items:center;
    justify-content: flex-end;
    margin-top: 1rem;

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
    width: 2rem;
    height: 2rem;
    justify-content: center;
    align-items: center;
    margin-left: 0.5rem;
    font-size:0.75rem;
    font-weight: 600;
    border: 1px solid;
    border-color: ${({ theme, activePage }) => (activePage ? theme.rgba(theme.blue900, 1) : 'transparent')};
    background: ${({ theme, activePage }) => (activePage ? theme.rgba(theme.white, 1) : theme.white)};
    font-weight: ${({ activePage }) => (activePage ? '700' : '400')};
    color: ${({ theme }) => theme.black};
    border-radius: 100%;
    transition: 0.2s;

    &:hover {
      border-color: ${({ isClickable }) => (isClickable ? 'transparent' : 'transparent')};
      background: ${({ theme, isClickable }) => (isClickable ? theme.rgba(theme.gray100, 1) : 'transparent')};
      color: ${({ theme }) => theme.black};
    }
`;
