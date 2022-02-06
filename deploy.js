require('dotenv').config()

const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const { abi, evm } = require('./compile')

const provider = new HDWalletProvider(
  process.env.ACCOUNT_MNEMONIC,
  process.env.NETWORK_DEPLOY_ADDRESS,
)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  const mainAccount = accounts[0]

  console.log('Attempting to deploy contract from account', mainAccount);

  return new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
    .send({ gas: 1e6.toString(), from: mainAccount })
}

deploy()
  .then(contract => {
    console.log('Contract deployed to', contract.options.address);
  })
  .catch(error => {
    console.error(error)
  })
  .finally(() => { 
    provider.engine.stop()
  })
