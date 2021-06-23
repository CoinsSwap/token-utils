

export default class TokenUtils {
  constructor(name, network) {
    return this._init(name, network)
  }

  get imported() {
    return globalThis.__tokenLists__.imported
  }

  get lists() {
    const lists = { ...globalThis.__tokenLists__ }

    delete lists.selected
    delete lists.ETH
    delete lists.imported
    return lists
  }

  get ETH() {
    return globalThis.__tokenLists__.ETH
  }

  isHex(string) {
    if (typeof(string) !== "string" || !string.match(/^0x[0-9A-Fa-f]*$/)) {
        return false
    }
    return true;
  }

  async _init(name, network) {
    if (!name) name = '0x'
    if (!network) network = 'kovan'
    if (!globalThis.__tokenLists__) {
      const importee = await import('./token-list.js')
      globalThis.__tokenLists__ = {}
      globalThis.__tokenLists__[name] = await new importee.default(name, network)
      globalThis.__tokenLists__.selected = name
      globalThis.__tokenLists__.ETH = {
        icon: {
          dark: 'https://raw.githubusercontent.com/CoinsSwap/token-list/main/build/icons/dark/eth.svg',
          white: 'https://raw.githubusercontent.com/CoinsSwap/token-list/main/build/icons/white/eth.svg',
          color: 'https://raw.githubusercontent.com/CoinsSwap/token-list/main/build/icons/color/eth.svg'
        },
        dominantColor: '#c9d2f6',
        symbol: 'ETH',
        name: 'Ether',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        decimals: 18
      }
      globalThis.__tokenLists__.imported = [name]
    }
    return this
  }

  isEthereumAddress(address) {
    if (address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' ||
        address === '0x0000000000000000000000000000000000000000') return true

    return false
  }

  isAddress(address) {
    const hasPrefix = address.slice(0, 2) === '0x';
    // a prefixed eth address is 21 bytes long
    if (address.length > 42 || address.length < 40) return false
    // without prefix
    if (!hasPrefix && address.length === 40 && this.isHex(address)) return true
    // with prefix
    if (hasPrefix && address.length === 42 &&
      this.isHex(address)) return true
    // no other cases to handle
    return false
  }

  /**
   * @param {String} token - Contract Address or token symbol
   */
  tokenInfo(token) {
    if (token.symbol && token.address && token.decimals) return token
    if (token === 'ETH' || isEthereumAddress(token)) return globalThis.__tokenLists__.ETH

    if (this.isAddress(token)) {
      return Object.values(css.lists[css.lists.selected])
        .filter(value => value.address === token)[0]
    }

    if (!globalThis.__tokenLists__[globalThis.__tokenLists__.selected][token]) {
      throw `nothing found for ${token}`
    }

    return globalThis.__tokenLists__[globalThis.__tokenLists__.selected][token]
  }
}
