# Hardhat-gasless-deployer-example

This is a working example for [gasless deployer hardhat plugin](https://www.npmjs.com/package/hardhat-gasless-deployer) using the [gas station network](https://opengsn.org/).


## Install
```bash
yarn
```

## Start local GSN
Start a new terminal to run your local GSN relayer (local network)
```bash
yarn gsn-with-ganache
```

You should see the following predeployed contracts address:

```bash
  RelayHub: 0xC89Ce4735882C9F0f0FE26686c53074E09B0D550
  RelayRegistrar: 0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab
  StakeManager: 0x5b1869D9A4C187F2EAa108f3062412ecf0526b24
  Penalizer: 0xCfEB869F69431e42cdB54A4F4f105C19C080A601
  Forwarder: 0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B
  TestToken (test only): 0x9b1f7F645351AF3631a656421eD2e40f2802E6c0
  Paymaster : 0xD833215cBcc3f914bD1C9ece3EE7BF8B14f841bb
```

## Configure
Update the paymaster, relayer hub and forwarder contract addresses in `hardhat-config.ts` with the addresses produced from your local GSN (above):

```javascript
hHGaslessDeployer: {
    ...
    paymaster: "0xD833215cBcc3f914bD1C9ece3EE7BF8B14f841bb",
    relayerHub: "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550",
    forwarder: "0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B",
  },
```

## Usage

Add your private key in `hardhat-config.ts`, this key will be used for signing transaction prior deployment.
```javascript 
    gsn: {
        url: "http://127.0.0.1:8545",
        accounts: [
            `YOUR_PRIVATE_KEY`,
        ],
        chainId: 1337
        },
    ...
```

Finally, deploy the sample `Lock` contract using the gasless deploy HardHat plugin.

```bash
yarn deploy:gsn
```

If this is the first time you run this plugin, it will deploy two helper contracts:

- A factory contract: which holds generic deployment logic with `CREATE2`.
- A paymaster contract: A whitelist paymaster but for simiplicity, the plugin will use a pre-deployed paymaster. 

These contracts will be deployed `only once` and their data will be stored in `gasless-contracts-deployments.json` file.
```json
{
  "gsn": {
    "factory": "0x6eD79Aa1c71FD7BdBC515EfdA3Bd4e26394435cC",
    "paymaster": "0xb09bCc172050fBd4562da8b229Cf3E45Dc3045A6"
  }
}
```

You should expect something as follows:
```bash
....
Transaction hash: 0x00000000a6d7ab10560d5ae6951daf77387b24ab2935ea06c05eaa3595dc78d1
Target contract "Lock" has been deployed @ "0x563013bCb323D720c4a282AA060552cCE3860c85"
```

## Test

You can run `yarn test` to execute a simple test case for deploying `Lock` contract on the GSN local net.

The test case has to: 
- deploy the factory & whitlestPaymaster contracts
- check the balance before deploying target contract `Lock` 
- deploy the target `Lock` contract
- assert that the balance doesn't change after the deployment

Please do note that sometimes the deployment might fail because at some point the randomly generated salt for `CREATE2` doesn't fulfill the `keccak256` hashing requirements. This will be fixed later. However you can re-run the test and it should work again.
