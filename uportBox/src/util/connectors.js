import { Connect, SimpleSigner } from 'uport-connect'

// Have to set these in config/env.js
export let uport = new Connect('PhotoShare', {
    clientId: "2ox4H1iv45V1mDTjxidW9UQ8WAuBkcuk18n",
    network: 'rinkeby',
    signer: SimpleSigner("157d36820ac12683468271aefd9b196e95a4c7fff4f4a846df7bb484727d28bf")
})


console.log(uport);

export const web3 = uport.getWeb3()

//access our local copy to contract deployed on rinkeby testnet
//use your own contract address
const address = '0xb84b12e953f5bcf01b05f926728e855f2d4a67a9';
//use the ABI from your contract
const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "getHash",
    "outputs": [
      {
        "name": "x",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "x",
        "type": "string"
      }
    ],
    "name": "sendHash",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const MyContract = web3.eth.contract(abi);
export const storehash = MyContract.at(address);