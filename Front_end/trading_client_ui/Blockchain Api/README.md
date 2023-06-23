## I - /contracts folder :

1- `npm install`
2- create .env file : (follow the .env.example)
PRIVATE_KEY = the private key of the account that will deploy the smart contracts and become the owner of the escrow contract
INFURA_URL = get a Sepolia RPC https endpoint from infura.io
3- `npx hardhat run --network sepolia scripts/deploy.js`
result :
compilation + :
✅ Token deployed successfully to : 0x2e5...B5be3
✅ Escrow contract deployed successfully to : 0x8cA...f11E3

---

## II - /api folder:

1- `npm install`
2- create .env file : (follow the .env.example)
OWNER_PRIVATE_KEY = the private key of the owner of the Escrow contract
CHAIN_RPC = get a Sepolia RPC https endpoint from infura.io
TOKEN_ADDRESS = the address of the token contract
ESCROW_ADDRESS = the address of the escrow contract
3- `npm start`
