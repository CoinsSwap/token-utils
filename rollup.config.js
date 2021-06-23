// import json from '@rollup/plugin-json'

export default [{
  input: 'src/token-utils.js',
  inlineDynamicImports: true,
  output: [{
    file: 'dist/token-utils.js',
    format: 'cjs'
  }, {
    file: 'dist/token-utils.mjs',
    format: 'es'
  }]
}]
