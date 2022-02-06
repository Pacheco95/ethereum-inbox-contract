const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const { abi, evm } = require('../compile')

const web3 = new Web3(ganache.provider())


describe('Inbox.sol', () => {
  let accounts = ['']
  let mainAccount = ''
  let inbox = null

  beforeEach(async () => {
    accounts = await web3.eth.getAccounts()

    mainAccount = accounts[0]

    inbox = await new web3.eth.Contract(abi)
      .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
      .send({ from: mainAccount, gas: 1e6.toString() })
  })

  it('should deploy the Inbox.sol contract', () => {
    assert.ok(inbox.options.address)
  });

  it('should have an inital message', async () => {
    const message = await inbox.methods.message().call()
    assert.equal(message, 'Hi there!')
  });

  it('should change message', async () => {
    await inbox.methods.setMessage('Hello World!').send({ from: mainAccount })
    const message = await inbox.methods.message().call()
    assert.equal(message, 'Hello World!')
  });
})