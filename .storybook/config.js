import { configure, addDecorator } from "@storybook/react"
import { setConsoleOptions, withConsole } from '@storybook/addon-console';
import themeDecorator from "./decorators/themeDecorator"
import routerDecorator from "./decorators/routerDecorator"
// import flexboxDecorator from "./decorators/flexboxDecorator"

setConsoleOptions({
    panelExclude: [],
});

addDecorator(themeDecorator);
addDecorator(routerDecorator);
// addDecorator(flexboxDecorator);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));


// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.js$/), module);
