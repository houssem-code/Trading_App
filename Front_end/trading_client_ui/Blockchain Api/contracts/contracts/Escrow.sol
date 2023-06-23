// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Escrow is Ownable{

    enum Status {
        OPEN,
        PENDING,
        SOLD,
        CANCELLED
    }

    struct Order {
        uint amount;
        address seller;
        address buyer;
        Status status;
    }

    uint public nextOrderId;

    // id => order 
    mapping (uint => Order) public orders;

    // orders by seller
    mapping (address => uint[]) ordersOfSeller;

    function getOrdersOfSeller(address _seller) public view returns (uint[] memory) {
        return ordersOfSeller[_seller];
    }

    // orders by buyer
    mapping (address => uint[]) ordersOfBuyer;

    function getOrdersOfBuyer(address _buyer) public view returns (uint[] memory) {
        return ordersOfSeller[_buyer];
    }

    // open orders by id
    mapping (uint => bool) public isOpen;

    // pending orders by id
    mapping (uint => bool) public isPending;

    IERC20 public token;

    constructor(address _token) {
        nextOrderId = 0;
        token = IERC20(_token);
    }

    function createOrder(uint _amount) public {
        token.transferFrom(msg.sender, address(this), _amount);
        
        orders[nextOrderId] = Order(
            _amount,
            msg.sender,
            0x0000000000000000000000000000000000000000,
            Status.OPEN
        );

        ordersOfSeller[msg.sender].push(nextOrderId);
        isOpen[nextOrderId] = true;
        nextOrderId++;
    }

    function cancelOrderBySeller(uint _orderId) public onlyOwner  {
        require(_orderId <= nextOrderId, "no order with this id");
        require(orders[_orderId].status == Status.OPEN, "order must be open");

        token.transfer(orders[_orderId].seller, orders[_orderId].amount);
        orders[_orderId].status = Status.CANCELLED;
        isOpen[_orderId] = false;
    }

    function requestBuy(address _buyer, uint _orderId) public onlyOwner  {
        require(orders[_orderId].status == Status.OPEN, "order must be open");

        orders[_orderId].buyer = _buyer;
        orders[_orderId].status = Status.PENDING;
        isOpen[_orderId] = false;
        isPending[_orderId] = true;
        ordersOfBuyer[_buyer].push(_orderId);
    }

    function cancelRequestBuyByBuyer(uint _orderId) public onlyOwner {
        require(orders[_orderId].status == Status.PENDING, "order must be pending");

        orders[_orderId].buyer = 0x0000000000000000000000000000000000000000;
        orders[_orderId].status = Status.OPEN;
        isOpen[_orderId] = true;
        isPending[_orderId] = false;
    }

    function completeOrder(uint _orderId) public onlyOwner {
        require(orders[_orderId].status == Status.PENDING, "order must be pending");
        
        token.transfer(
            orders[_orderId].buyer, 
            orders[_orderId].amount
        );

        orders[_orderId].status = Status.SOLD;
        isOpen[_orderId] = false;
        isPending[_orderId] = false;
    }


}