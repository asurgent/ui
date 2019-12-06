import React from "react"
import styled from 'styled-components';


const FlexBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`


const FlexboxDecorator = storyFn => (
    <FlexBox>{storyFn()}</FlexBox>
)

export default FlexboxDecorator