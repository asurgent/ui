import { configure, addDecorator } from "@storybook/react"
import { setConsoleOptions, withConsole } from '@storybook/addon-console';
import themeDecorator from "./decorators/themeDecorator"
import routerDecorator from "./decorators/routerDecorator"
import i18nDecorator from "./decorators/i18nDecorator"
setConsoleOptions({
    panelExclude: [],
});

addDecorator(themeDecorator);
addDecorator(routerDecorator);
addDecorator(i18nDecorator);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));

configure(require.context('../src', true, /\.stories\.js$/), module);
