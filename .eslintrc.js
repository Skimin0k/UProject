module.exports = {
    'env': {
        'browser': true,
        'amd': true,
        'node': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:i18next/recommended'
    ],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            },
        },
        {
            'files': ['*.js', '*.jsx', '*.ts', '*.tsx'],
            'rules': {
                'simple-import-sort/imports': [
                    'error',
                    {
                        'groups': [
                            // Packages `react` related packages come first.
                            ['^react', '^@?\\w'],
                            // Internal packages.
                            ['^(@|components)(/.*|$)'],
                            // Side effect imports.
                            ['^\\u0000'],
                            // Parent imports. Put `..` last.
                            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                            // Other relative imports. Put same-folder imports and `.` last.
                            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                            // Style imports.
                            ['^.+\\.?(css)$']
                        ]
                    }
                ]
            }
        }

    ],
    'ignorePatterns': ['*.test.*'],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint',
        'react',
        'i18next',
        'simple-import-sort'
    ],
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-unused-vars': [1],
        'react/react-in-jsx-scope': 'off',
        'i18next/no-literal-string': [2, {markupOnly: true}],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error'
    }
}
