import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type ArewaJettonConfig = {};

export function arewaJettonConfigToCell(config: ArewaJettonConfig): Cell {
    return beginCell().endCell();
}

export class ArewaJetton implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new ArewaJetton(address);
    }

    static createFromConfig(config: ArewaJettonConfig, code: Cell, workchain = 0) {
        const data = arewaJettonConfigToCell(config);
        const init = { code, data };
        return new ArewaJetton(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
