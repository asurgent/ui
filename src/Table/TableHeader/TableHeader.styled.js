import styled from 'styled-components';
import * as C from '../BaseTable/BaseTable.styled';

export const HeaderRow = styled(C.Row)`
    border-top:none;
`;

export const Header = styled(C.Cell)`
    align-items: center;
    grid-column: unset;
    flex-direction: row;
    border-color: ${({ theme }) => theme.gray300};
    min-height: unset;
`;

export const HeaderLabel = styled(C.TableCellContent)`
    color: ${({ theme }) => theme.gray600};
    font-weight: 600;
    font-size: 1.2rem;
`;
