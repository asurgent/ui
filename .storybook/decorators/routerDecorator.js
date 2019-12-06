import React from "react"
import { BrowserRouter} from 'react-router-dom'

const RouterDecorator = storyFn => (
    <BrowserRouter>{storyFn()}</BrowserRouter>
)

export default RouterDecorator