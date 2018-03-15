module.exports = {
	'env': {
		'browser': true,
		'es6': true
	},

	'extends': 'eslint:recommended',

	'globals': {
		'jQuery': false,
		'$': true
	},

	'rules': {
		// Variables
		'no-shadow': 2,
		'no-shadow-restricted-names': 2,
		'no-unused-vars': [2, {
			'vars': 'local',
			'args': 'after-used'
		}],

		'no-use-before-define': ['error', {'functions': false}],
		
		// Possible errors
		// 'comma-dangle': [2, 'always-multiline'],
		'no-cond-assign': [2, 'always'],
		'no-console': 1,
		'no-debugger': 1,
		'no-alert': 1,
		'no-constant-condition': 1,
		'no-dupe-keys': 2,
		'no-duplicate-case': 2,
		'no-empty': 2,
		'no-ex-assign': 2,
		'no-extra-boolean-cast': 0,
		'no-extra-semi': 2,
		'no-func-assign': 2,
		'no-inner-declarations': 2,
		'no-invalid-regexp': 2,
		'no-irregular-whitespace': 2,
		'no-obj-calls': 2,
		'no-sparse-arrays': 2,
		'no-unreachable': 2,
		'use-isnan': 2,
		'block-scoped-var': 2,
		
		// Best practices
		'consistent-return': 2,
		
		// Disabled temporarily.
		'curly': [0, 'multi'],
		
		'default-case': 2,
		'dot-notation': [2, {
			'allowKeywords': true
		}],


		'eqeqeq': 2,
		'guard-for-in': 2,
		'no-caller': 2,
		'no-else-return': 2,
		'no-eq-null': 2,
		'no-eval': 2,
		'no-extend-native': 2,
		'no-extra-bind': 2,
		'no-fallthrough': 2,
		'no-floating-decimal': 2,
		'no-implied-eval': 2,
		'no-lone-blocks': 2,
		'no-loop-func': 2,
		'no-multi-str': 2,
		'no-native-reassign': 2,
		'no-new': 2,
		'no-new-func': 2,
		'no-new-wrappers': 2,
		'no-octal': 2,
		'no-octal-escape': 2,
		'no-param-reassign': 2,
		'no-proto': 2,
		'no-redeclare': 2,
		'no-return-assign': 2,
		'no-script-url': 2,
		'no-self-compare': 2,
		'no-sequences': 2,
		'no-throw-literal': 2,
		'no-with': 2,
		'radix': 2,
		'vars-on-top': 2,
		'wrap-iife': [2, 'any'],
		'yoda': 2,
		
		// Code style
		'max-len': [2, 120, 4,
		{
			'ignoreComments': true,
			'ignoreUrls': true,
			'ignorePattern': '^\\s*var\\s.+=\\s*require\\s*\\('
		}
		],

		// 'indent': ['warn', 'tab'],
		'brace-style': [
			2,
			'1tbs', {
				'allowSingleLine': true
			}
			],

			'quotes': [
			2, 'single', 'avoid-escape'
			],

		'camelcase': [2, {
			'properties': 'never'
		}],

		'comma-spacing': [2, {
			'before': false,
			'after': true
		}],

		'comma-style': [2, 'last'],
		'eol-last': 2,
		'key-spacing': [2, {
			'beforeColon': false,
			'afterColon': true
		}],

		'new-cap': [2, {
			'newIsCap': true,
			'capIsNewExceptions': [
			'$.Deferred'
			]
		}],

		'no-multiple-empty-lines': [2, {
			'max': 2
		}],

		'no-nested-ternary': 2,
		'no-new-object': 2,
		'no-spaced-func': 2,
		'no-trailing-spaces': 2,
		'no-extra-parens': [2, 'functions'],
		'no-underscore-dangle': 0,
		'one-var': [2, 'never'],
		'padded-blocks': [2, 'never'],
		'semi': [2, 'always'],
		'semi-spacing': [2, {
			'before': false,
			'after': true
		}],

		'keyword-spacing': ['warn'],
		'space-before-blocks': 2,
		'space-before-function-paren': [2, {
			'anonymous': 'always',
			'named': 'never'
		}],

		
		'space-infix-ops': 2,
		'spaced-comment': [2, 'always',  {
			'exceptions': ['-', '+'],
			'markers': ['=', '!']           // space here to support sprockets directives
		}]

		// 'brace-style': 'warn',
		// 'comma-dangle': ['warn', 'always-multiline'],
		// 'curly': 'error',
		// 'indent': ['warn', 'tab', {'SwitchCase': 1}],
		'linebreak-style': 'off',
		// 'no-console': ['error', { allow: ['warn', 'error'] }],
		// 'no-empty': ['error', { 'allowEmptyCatch': true }],
		// 'no-multiple-empty-lines': ['warn', {'max': 2}],
		'no-var': 'warn',
		'one-var': ['warn', 'never'],
		'prefer-const': 'warn',
		'prefer-template': 'warn',
		'quotes': ['warn', 'single'],
		// 'semi': ['warn', 'always'],
	}
}