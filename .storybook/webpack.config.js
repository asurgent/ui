const path = require('path');

module.exports = function({ config }) {
    config.module.rules.push({
        test: /\.stories\.js?$/,
        loaders: [require.resolve('@storybook/source-loader')],
        enforce: 'pre',
    });

    Object.assign(config, {
        resolve: {
            alias: {
              'high-order-components': path.resolve(__dirname, '../high-order-components'),
            },
        },
    })

    return config;
};