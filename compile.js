const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inboxContractPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const contractSourceCode = fs.readFileSync(inboxContractPath, 'utf8')

const compilerOptions = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: contractSourceCode,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const compilationResult = solc.compile(JSON.stringify(compilerOptions))

module.exports = JSON.parse(compilationResult).contracts['Inbox.sol'].Inbox;
