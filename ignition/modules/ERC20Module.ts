import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ERC20Module = buildModule("ERC20Module", (m) => {
    const token = m.contract("ERC20");
    return { token };
});
export default ERC20Module;