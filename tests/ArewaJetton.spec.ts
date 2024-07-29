import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { ArewaJetton } from '../wrappers/ArewaJetton';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('ArewaJetton', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('ArewaJetton');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let arewaJetton: SandboxContract<ArewaJetton>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        arewaJetton = blockchain.openContract(ArewaJetton.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await arewaJetton.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: arewaJetton.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and arewaJetton are ready to use
    });
});
