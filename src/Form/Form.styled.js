import styled from 'styled-components';

export const FormStyle = styled.form`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;

    input {
        &:disabled {
            color: ${({ theme }) => theme.gray400};
        }
    }
`;


export const FormRow = styled.div`
    display: block;
    width: 100%;
`;
