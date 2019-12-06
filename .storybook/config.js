import { configure, addDecorator } from "@storybook/react"
import themeDecorator from "./decorators/themeDecorator"
import routerDecorator from "./decorators/routerDecorator"
import flexboxDecorator from "./decorators/flexboxDecorator"

addDecorator(themeDecorator);
addDecorator(routerDecorator);
addDecorator(flexboxDecorator);

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.js$/), module);
