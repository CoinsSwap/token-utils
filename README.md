# token-utils

## install
```sh
npm i --save @coinsswap/token-utils
```

## usage
```js
import TokenUtils from '@coinsswap/token-utils'

const tokenUtils = await new TokenUtils('0x', 'kovan')

console.log(utils.lists) // all available (imported lists)
console.log(utils.imported) // ox list
console.log(utils.tokenInfo('ETH')) // Ethereum token info
console.log(utils.isAddress('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')) // true
console.log(utils.isEthereumAddress('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')) // true
```
