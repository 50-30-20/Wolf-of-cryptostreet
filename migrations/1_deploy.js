const Flashloan = artifacts.require("Flashloan");
const FlashloanSwitch = artifacts.require("FlashloanSwitch");

module.exports = async function (deployer) {
    await deployer.deploy(Flashloan, '0x506B0B2CF20FAA8f38a4E2B524EE43e1f4458Cc5');
};
