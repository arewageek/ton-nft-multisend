import { toNano } from '@ton/core';
import { ArewaJetton } from '../wrappers/ArewaJetton';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const arewaJetton = provider.open(ArewaJetton.createFromConfig({}, await compile('ArewaJetton')));

    await arewaJetton.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(arewaJetton.address);

    // run methods on `arewaJetton`
}
