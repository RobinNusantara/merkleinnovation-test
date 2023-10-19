module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "eslint-config-prettier",
        "plugin:jsdoc/recommended",
    ],
    plugins: ["eslint-plugin-prettier", "jsdoc"],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        "prettier/prettier": "error",
        "no-unused-vars": "warn",
        "jsdoc/check-property-names": 0,
        "jsdoc/check-tag-names": 0,
        "jsdoc/require-param-description": 0,
        "jsdoc/require-property-description": 0,
        "jsdoc/require-returns": 0,
        "jsdoc/require-returns-description": 0,
        "jsdoc/tag-lines": 0,
        "jsdoc/valid-types": 0,
    },
};