const TovarCoin = artifacts.require('TovarCoin')
const assert = require('assert')
const BigNumber = require('bignumber.js')

const totalSupply = new BigNumber('1e28')
const initialSupply = new BigNumber('1e28')
const expectedToken = {
  name: 'TovarCoin',
  symbol: 'TVR',
  decimals: 18,
  totalSupply,
  initialSupply
}

describe('when deploying TovarCoin', () => {
  contract('TovarCoin', accounts => {
    let tc
    const owner = accounts[0]
    const recipient = accounts[1]
    before('setup contract', async () => {
      tc = await TovarCoin.new('1e28', 'TovarCoin', 'TVR', 18)
    })

    it('should have the correct values', async () => {
      const name = await tc.name()
      const symbol = await tc.symbol()
      const decimals = await tc.decimals()
      const totalSupply = await tc.totalSupply()
      const initalSupply = await tc.initialSupply()
      const expectedOwner = await tc.owner()

      assert.equal(
        name,
        expectedToken.name,
        'the name should be Tovarcoin'
      )

      assert.equal(
        symbol,
        expectedToken.symbol,
        'the symbol should be TVR'
      )

      assert.equal(
        decimals,
        expectedToken.decimals,
        'the decimals should be 18'
      )

      assert.equal(
        totalSupply.toString(),
        expectedToken.totalSupply.toString(),
        'the totalSupply should be 1e28'
      )

      assert.equal(
        initalSupply.toString(),
        expectedToken.initialSupply.toString(),
        'the initalSupply should be 1e28'
      )

      assert.equal(
        name,
        expectedToken.name,
        'the name should be Tovarcoin'
      )

      assert.equal(
        owner,
        expectedOwner,
        'the name should be Tovarcoin'
      )
    })

    it('should distribute to users', async () => {
      const sendAmount = new BigNumber('1e11')
      const preRecipientBalance = await tc.balanceOf(recipient)
      const preContractBalance = await tc.balanceOf(tc.address)
      await tc.distributeTokens(recipient, '1e11', {
        from: owner
      })
      const postRecipientBalance = await tc.balanceOf(recipient)
      const postContractBalance = await tc.balanceOf(tc.address)

      assert.equal(
        postRecipientBalance.sub(preRecipientBalance).toString(),
        sendAmount.toString(),
        'the recipient token balance should be incremented by the sendAmount'
      )

      assert.equal(
        preContractBalance.sub(postContractBalance).toString(),
        sendAmount.toString(),
        'the contract token balance should be incremented by the sendAmount'
      )
    })
  })

})
