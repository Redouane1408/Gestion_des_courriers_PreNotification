module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3,
      targets: {
        browsers: [
          '>0.2%',
          'not dead',
          'not op_mini all',
          'IE 11',
          'Edge >= 80',
          'Firefox >= 78',
          'Chrome >= 87',
          'Safari >= 13'
        ]
      }
    }],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator'
  ]
};