const Utils = require('./dist/token-utils');
const test = require('tape')

test('token utils', async tape => {
  const utils = await new Utils('0x', 'kovan')
  tape.plan(5)
  tape.equal(Object.keys(utils.lists).length, 1, 'token list length')
  tape.equal(utils.imported.length, 1, 'imported lists')
  tape.equal(Object.keys(utils.tokenInfo('ETH')).length, 6, 'tokenInfo')
  tape.deepEqual([
    utils.isAddress('ETH'),
    utils.isAddress('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
  ], [false, true], 'isAddress')

  tape.deepEqual([
    utils.isAddress('ETH'),
    utils.isEthereumAddress('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
  ], [false, true], 'isEthereumAddress')
})
