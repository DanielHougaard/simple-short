module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ["airbnb", "airbnb/hooks", "plugin:@next/next/recommended"],
    overrides: [
        {
            files: ["**/*.{ts,tsx}"],
            extends: ["airbnb-typescript"]
        }
    ],
    parserOptions: {
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"]
    },
    rules: {
        "react/react-in-jsx-scope": "off",
        "react/jsx-one-expression-per-line": "off",
        "react/prop-types": "off",
        "react/require-default-props": "off",
        "react/jsx-props-no-spreading": "off",
        "import/order": [
            "error",
            {
                alphabetize: { order: "asc" },
                groups: [["builtin", "external"], "internal", "parent", "sibling", "index"],
                "newlines-between": "never"
            }
        ],
        "object-curly-newline": ["error", { multiline: true, consistent: true }],
        "max-len": [
            "error",
            {
                code: 120,
                ignoreComments: true,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true
            }
        ]
    },
    ignorePatterns: ["node_modules", "dist", ".next", "build", "out", "coverage", ".eslintrc*", "next.config.js", "tsconfig.json"]
};
