module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "commonjs": true,
    },
    "extends": [
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        "eslint-config-prettier"
    ],
    "overrides": [],
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "parser": "@typescript-eslint/parser"
    },
    "ignorePatterns": ['!<relative/path/to/filename>'],
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-ts-comment': 'off'
    }
}