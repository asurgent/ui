import styled from 'styled-components';
import * as Button from '../../Button/Button.styled';

export const Default = styled.div`
    font-size: 1rem;
    line-height: 1rem;
    border: 1px solid ${({ theme }) => theme.gold100};
    border-radius: 2px;
    background: ${({ theme }) => theme.gold100};
    display: flex;
    align-items: center;
    max-width: 100%;
    font-weight: 700;

    .label {
        padding: .4rem;
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    ${Button.Plain} {
        padding: .4rem ;
        text-decoration: none;
        border-left: 1px solid ${({ theme }) => theme.gray300};

        .label {
            display: none;
        }
    }
`;

export const TagsCollection = styled.div`
    display: flex;
    flex-flow: wrap;
    align-items: center;
    margin: -.4rem;

    ${Default} {
        margin: .4rem;
    }
`;
export const SpillOver = styled.div`
    font-size: 1rem;
    line-height: 1rem;
    padding: .4rem;
    padding-left: 0;
`;
