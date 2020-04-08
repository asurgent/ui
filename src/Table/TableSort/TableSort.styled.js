import styled from 'styled-components';
import * as Button from '../../Button/Button.styled';

const SortWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;

    ${Button.Icon} {
        margin: 0 .6rem;
    }
`;

export default SortWrapper;
