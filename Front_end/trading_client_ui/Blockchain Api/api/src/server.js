const express = require("express");
const cors = require("cors");
const Web3 = require("web3");
const Token_abi = require("../assets/Token_abi.json");
const Escrow_abi = require("../assets/Escrow_abi.json");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT;
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
const ESCROW_ADDRESS = process.env.ESCROW_ADDRESS;
const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;
const CHAIN_RPC = process.env.CHAIN_RPC;
const web3 = new Web3(CHAIN_RPC);

const Token = new web3.eth.Contract(Token_abi, TOKEN_ADDRESS);
const Escrow = new web3.eth.Contract(Escrow_abi, ESCROW_ADDRESS);

const status = ["Open", "Pending", "Sold", "Cancelled"];

app.get("/balanceOf/:address", async (req, res) => {
  const balance = await Token.methods
    .balanceOf(web3.utils.toChecksumAddress(req.params.address))
    .call();
  res.status(200).json({ balance: web3.utils.fromWei(balance) });
});

app.get("/lastOrderId", async (req, res) => {
  const nextOrderId = await Escrow.methods
    .nextOrderId()
    .call();
  res.status(200).json({ lastOrderId: nextOrderId - 1 });
});

app.get("/buyOrders/:address", async (req, res) => {
  const ids = await Escrow.methods
    .getOrdersOfBuyer(web3.utils.toChecksumAddress(req.params.address))
    .call();
  res.status(200).json({ orders: ids });
});

app.get("/sellOrders/:address", async (req, res) => {
  const ids = await Escrow.methods
    .getOrdersOfSeller(web3.utils.toChecksumAddress(req.params.address))
    .call();
  res.status(200).json({ orders: ids });
});

app.get("/isOpen/:orderId", async (req, res) => {
  const isOpen = await Escrow.methods.isOpen(req.params.orderId).call();
  res.status(200).json({ isOpen: isOpen });
});

app.get("/isPending/:orderId", async (req, res) => {
  const isPending = await Escrow.methods.isPending(req.params.orderId).call();
  res.status(200).json({ isPending: isPending });
});

app.get("/order/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const nextOrderId = await Escrow.methods.nextOrderId().call();

  /*if (orderId >= nextOrderId)
    return res
      .status(404)
      .json({ order: `Order with id = ${orderId} is not created yet.` });*/

  let order = await Escrow.methods.orders(orderId).call();
  order = {
    amount: web3.utils.fromWei(order.amount),
    seller: order.seller,
    buyer: order.buyer,
    status: status[parseInt(order.status)],
  };
  res.status(200).json({ order: order });
});

app.post("/requestBuy/:orderId/:buyerAddress", async (req, res) => {
  const orderId = req.params.orderId;
  const nextOrderId = await Escrow.methods.nextOrderId().call();

  /*if (orderId >= nextOrderId)
    return res
      .status(404)
      .json({ message: `Order with id = ${orderId} is not created yet.` });*/

  let order = await Escrow.methods.orders(orderId).call();
  if (order.status != "0")
    return res
      .status(404)
      .json({ message: `Order with id = ${orderId} is not open.` });

  const tx = Escrow.methods.requestBuy(req.params.buyerAddress, orderId);
  const data = tx.encodeABI();
  const sender = web3.eth.accounts.privateKeyToAccount(OWNER_PRIVATE_KEY);
  await web3.eth.accounts.signTransaction(
    {
      to: Escrow.options.address,
      data: data,
      gas: 250000,
    },
    sender.privateKey,
    async (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occured" });
      }
      if (result) {
        const rawTransaction = result.rawTransaction ?? "";
        try {
          await web3.eth.sendSignedTransaction(rawTransaction);
          return res.status(201).json({ message: "Success !" });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "An error occured" });
        }
      }
    }
  );
});

app.post("/cancelOrderBySeller/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const nextOrderId = await Escrow.methods.nextOrderId().call();

  /*if (orderId >= nextOrderId)
    return res
      .status(404)
      .json({ message: `Order with id = ${orderId} is not created yet.` });*/

  let order = await Escrow.methods.orders(orderId).call();
  if (order.status != "0")
    return res
      .status(404)
      .json({ message: `Order with id = ${orderId} is not open.` });

  const tx = Escrow.methods.cancelOrderBySeller(orderId);
  const data = tx.encodeABI();
  const sender = web3.eth.accounts.privateKeyToAccount(OWNER_PRIVATE_KEY);
  await web3.eth.accounts.signTransaction(
    {
      to: Escrow.options.address,
      data: data,
      gas: 250000,
    },
    sender.privateKey,
    async (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occured" });
      }
      if (result) {
        const rawTransaction = result.rawTransaction ?? "";
        try {
          await web3.eth.sendSignedTransaction(rawTransaction);
          return res.status(201).json({ message: "Success !" });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "An error occured" });
        }
      }
    }
  );
});

app.post("/cancelOrderRequestByBuyer/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const nextOrderId = await Escrow.methods.nextOrderId().call();

  /*if (orderId >= nextOrderId)
    return res
      .status(404)
      .json({ message: `Order with id = ${orderId} is not created yet.` });*/

  let order = await Escrow.methods.orders(orderId).call();
  if (order.status != "1")
    return res
      .status(404)
      .json({ message: `Order with id = ${orderId} is not pending.` });

  const tx = Escrow.methods.cancelRequestBuyByBuyer(orderId);
  const data = tx.encodeABI();
  const sender = web3.eth.accounts.privateKeyToAccount(OWNER_PRIVATE_KEY);
  await web3.eth.accounts.signTransaction(
    {
      to: Escrow.options.address,
      data: data,
      gas: 125000,
    },
    sender.privateKey,
    async (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occured" });
      }
      if (result) {
        const rawTransaction = result.rawTransaction ?? "";
        try {
          await web3.eth.sendSignedTransaction(rawTransaction);
          return res.status(201).json({ message: "Success !" });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "An error occured" });
        }
      }
    }
  );
});

app.post("/completeOrder/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const nextOrderId = await Escrow.methods.nextOrderId().call();

  if (orderId >= nextOrderId)
    return res
      .status(404)
      .json({ message: `Order with id = ${orderId} is not created yet.` });

  let order = await Escrow.methods.orders(orderId).call();
  if (order.status != "1")
    return res
      .status(404)
      .json({ message: `Order with id = ${orderId} is not pending.` });

  const tx = Escrow.methods.completeOrder(orderId);
  const data = tx.encodeABI();
  const sender = web3.eth.accounts.privateKeyToAccount(OWNER_PRIVATE_KEY);
  await web3.eth.accounts.signTransaction(
    {
      to: Escrow.options.address,
      data: data,
      gas: 250000,
    },
    sender.privateKey,
    async (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occured" });
      }
      if (result) {
        const rawTransaction = result.rawTransaction ?? "";
        try {
          await web3.eth.sendSignedTransaction(rawTransaction);
          return res.status(201).json({ message: "Success !" });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "An error occured" });
        }
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
