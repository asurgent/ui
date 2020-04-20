import styled from 'styled-components';

export const Wrapper = styled.div`
    width: auto;
    height: inherit;
    overflow-y: scroll;
`;

export const Row = styled.div`
    margin-top: 2.4rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-end;
`;

export const Label = styled.div`
    margin-top: 2.4rem;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: baseline;
    font-size: 1.2rem;
    white-space: pre;
    
    input {
        margin: 0 .8rem;
    }
`;

export const WeekSelector = styled.div`
    margin-top: 2.4rem;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: .4rem;
    grid-row-gap: .4rem;
`;

export const MonthSlector = styled(WeekSelector)`
    grid-template-rows: repeat(5, 1fr);
`;

export const Editor = styled.div``;

export const Text = styled.div`
    margin-bottom: .8rem;
    font-size: 1.4rem;
`;

export const Columns = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Title = styled.h6`
    margin: 0;
    padding: 0;
`;

export const Output = styled.div`
    border-left: 1px solid ${({ theme }) => theme.gray300};
    border-width: ${({ withBorder }) => (withBorder ? 1 : 0)};
    margin-left: ${({ withBorder }) => (withBorder ? '1.6rem' : '')};
    padding-left: ${({ withBorder }) => (withBorder ? '1.6rem' : '')};
`;

export const Day = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({ selected, theme }) => (selected ? theme.blue700 : theme.gray800)};
    background:${({ selected, theme }) => (selected ? theme.blue400 : 'transparent')};
    color :${({ selected, theme }) => (selected ? theme.white : theme.gray800)};
    font-size: 1.4rem;
    cursor: pointer;

    &:hover {
        border-width: 2px;
    }
`;
