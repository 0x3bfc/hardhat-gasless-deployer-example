# Hardhat-gasless-deployer-example

This is an working example for [gasless deployer hardhat plugin](https://www.npmjs.com/package/hardhat-gasless-deployer) using the [gas station network](https://opengsn.org/).


## Install
```bash
yarn
```

## Run local GSN relayer
In new terminal start your local GSN relayer (local network)
```bash
yarn gsn-with-ganache
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

Deploy a sample `Lock` contract using the gasless deploy HardHat plugin.

```bash
yarn deploy:gsn
```