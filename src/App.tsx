import { useState } from 'react';
import { FloatingButton } from './components/FloatingButton';
import PageWrapper from './components/PageWrapper'
import VaultItemContainer, { VaultItem } from './components/VaultItemContainer'
import { FaDownload } from 'react-icons/fa';

function App() {
    const [mockPendingVaultItems, setMockPendingVaultItems] = useState([
        {
            id: 1,
            username: "Solana",
            content: "This is a test message",
            pending: true
        } as VaultItem,
        {
            id: 2,
            username: "Jason",
            content: "Lorum ipsum type vibe",
            pending: true
        } as VaultItem,
    ]);

    const [mockAcceptedVaultItems, setMockAcceptedVaultItems] = useState([
        {
            id: 3,
            username: "Julie",
            content: "this is a mock up item test test test",
            pending: false
        } as VaultItem,
        {
            id: 4,
            username: "Chooky",
            content: "no",
            pending: false
        } as VaultItem,
    ]);

    function handleDownload() {
        alert("[Debug] Downloading");
    }

    function onAccept(vaultItemId: number) {
        const vaultItemIdx = mockPendingVaultItems.findIndex(vaultItem => vaultItem.id == vaultItemId);

        setMockAcceptedVaultItems([...mockAcceptedVaultItems, {...mockPendingVaultItems[vaultItemIdx], pending: false}]);

        // Remove item from useState array
        setMockPendingVaultItems([
            ...mockPendingVaultItems.slice(0, vaultItemIdx),
            ...mockPendingVaultItems.slice(vaultItemIdx + 1, mockPendingVaultItems.length)
        ])
    }

    function onDecline(vaultItemId: number) {
        const vaultItemIdx = mockPendingVaultItems.findIndex(vaultItem => vaultItem.id == vaultItemId);
        //
        // Remove item from useState array
        setMockPendingVaultItems([
            ...mockPendingVaultItems.slice(0, vaultItemIdx),
            ...mockPendingVaultItems.slice(vaultItemIdx + 1, mockPendingVaultItems.length)
        ])
    }

    return (
        <PageWrapper>
            <div className="flex justify-between gap-12">
                <div className="flex flex-col gap-4 w-full">
                    <h1 className="text-4xl text-white font-medium">Pending Vault Items</h1>
                    {
                        mockPendingVaultItems.map(vaultItem =>
                            <VaultItemContainer vaultItem={vaultItem} onAccept={onAccept} onDecline={onDecline} />
                        )
                    }
                </div>

                <div className="flex flex-col gap-4 w-full">
                    <h1 className="text-4xl text-white font-medium">Accepted Items</h1>
                    {
                        mockAcceptedVaultItems.map(vaultItem =>
                            <VaultItemContainer vaultItem={vaultItem} onAccept={onAccept} onDecline={onDecline} />
                        )
                    }
                </div>
            </div>

            <FloatingButton handleClick={handleDownload}>
                <FaDownload size={35} />
            </FloatingButton>
        </PageWrapper>
    )
}

export default App
