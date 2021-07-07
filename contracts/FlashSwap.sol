// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./aave/FlashLoanReceiverBase.sol";
import "./aave/ILendingPoolAddressesProvider.sol";
import "./aave/ILendingPool.sol";
import {SafeMath} from './utils/math/SafeMath.sol';
import "./uniswap/IUniswapV2Router02.sol";
import "./uniswap/IUniswapV2Factory.sol";

contract Flashloan is FlashLoanReceiverBase {
    using SafeMath for uint256;
    
    IUniswapV2Router02 public uniswapRouter;
    IUniswapV2Router02 public sushiswapRouter;
    uint256 public tokensOut;
    uint256 public deadline;
    uint256 public ethBalance;
    uint256 public ethAmount;
    uint256 public estimatedTokens;

    struct ArbInfo {
        string direction;
        IUniswapV2Router02 router1;
        IUniswapV2Router02 router2;
    }

    mapping(string => ArbInfo) public routers;

    constructor(address _addressProvider) FlashLoanReceiverBase(_addressProvider) public {
        uniswapRouter = IUniswapV2Router02(
            0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
        );
        sushiswapRouter = IUniswapV2Router02(
            0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506
        );
    }

    function addRouters(string memory _dexName, IUniswapV2Router02 _router1, IUniswapV2Router02 _router2) public onlyOwner {
        require(routers[_dexName].router1 != _router1, 'Flashloan 36: Router already added');

        routers[_dexName] = ArbInfo(_dexName, _router1, _router2);
    }

    function flashloan(address _asset, uint256 _amount, string memory _direction) public onlyOwner {
        bytes memory data = abi.encode(_direction);

        ILendingPool lendingPool = ILendingPool(addressesProvider.getLendingPool());
        lendingPool.flashLoan(address(this), _asset, _amount, data);
    }

    function executeOperation(
        address _reserve,
        uint256 _amount,
        uint256 _fee,
        bytes calldata _params
    )
        external
        override
    {
        require(_amount <= getBalanceInternal(address(this), _reserve), "Invalid balance, was the flashLoan successful?");
        
        ArbInfo memory _arbInfo = routers[abi.decode(bytes(_params), (string))];       
        // swap trade logic goes here.
        swapTokens(_reserve, _amount, _arbInfo.router1, _arbInfo.router2);

        uint totalDebt = _amount.add(_fee);
        transferFundsBackToPoolInternal(_reserve, totalDebt);
    }

    // asset - _reserve, amountToTrade -> _amount
    // we take dai from aave convert it to eth then swap them back to dai from sushiswap
    function swapTokens(
        address assest, 
        uint256 _amount, 
        IUniswapV2Router02 _router1, 
        IUniswapV2Router02 _router2
    ) public {
        IERC20 dai = IERC20(assest);
        deadline = block.timestamp + 300;

        dai.approve(address(_router1), _amount);
        uint256 estimatedETH =
            getEstimatedETHForToken(_amount, address(assest), _router1)[1];

        _router1.swapExactTokensForETH(
            _amount,
            estimatedETH,
            getAssetPath(address(assest), _router1),
            address(this),
            deadline
        );

        ethBalance = address(this).balance;

        estimatedTokens = getEstimatedTokensForETH(
            ethBalance,
            address(assest),
            _router2
        )[1];

        _router2.swapExactETHForTokens{value: ethBalance}(
            estimatedTokens,
            getETHPath(address(assest), _router2),
            address(this),
            deadline
        );
    }

    function getEstimatedETHForToken(
        uint256 _tokenAmount, 
        address ERC20Token,
        IUniswapV2Router02 _router1 
    )
        public
        view
        returns (uint256[] memory)
    {
        return
            _router1.getAmountsOut(_tokenAmount, getAssetPath(ERC20Token, _router1));
    }

    function getEstimatedTokensForETH(
        uint256 _tokenAmount, 
        address ERC20Token,
        IUniswapV2Router02 _router
    )
        public
        view
        returns (uint256[] memory)
    {
        return
            _router.getAmountsOut(_tokenAmount, getETHPath(ERC20Token, _router));
    }

    function getAssetPath(
        address Token,
        IUniswapV2Router02 _router1
    )
        private
        view
        returns (address[] memory)
    {
        address[] memory path = new address[](2);
        path[0] = Token;
        path[1] = _router1.WETH();

        return path;
    }

    function getETHPath(
        address Token, 
        IUniswapV2Router02 _router
    ) private view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = _router.WETH();
        path[1] = Token;

        return path;
    }
    //receive() external payable {}
}