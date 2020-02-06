const eslint = require('@asurgent/eslint-config-asurgent');
const path = require('path');

module.exports = eslint({
    "settings": {
        "import/resolver": {
            "alias": {
                "map": [
                    ['high-order-components', path.resolve(__dirname, 'high-order-components')]
                ]
            }
        }
    }
})