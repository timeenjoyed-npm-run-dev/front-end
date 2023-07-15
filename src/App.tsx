import { useEffect, useState } from 'react';
import { FloatingButton } from './components/FloatingButton';
import PageWrapper from './components/PageWrapper'
import VaultItemContainer, { VaultItem } from './components/VaultItemContainer'
import { FaDownload } from 'react-icons/fa';

const POLLING_TIME = 10000;

function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState<VaultItem[]>([]);

    useEffect(() => {
        retrieveItems();
    }, []);

    function handleDownload() {
        let content: string = "  _____ _           ___       _                 _ _      _____ _              ___                   _     \n" +
            " |_   _(_)_ __  ___| __|_ _  (_)___ _  _ ___ __| ( )___ |_   _(_)_ __  ___   / __|__ _ _ __ ____  _| |___ \n" +
            "   | | | | '  \\/ -_) _|| ' \\ | / _ \\ || / -_) _` |/(_-<   | | | | '  \\/ -_) | (__/ _` | '_ (_-< || | / -_)\n" +
            "   |_| |_|_|_|_\\___|___|_||_|/ \\___/\\_, \\___\\__,_| /__/   |_| |_|_|_|_\\___|  \\___\\__,_| .__/__/\\_,_|_\\___|\n" +
            "                           |__/     |__/                                              |_|                 \n\n\n";

        for (let idx = 0; idx < items.length; idx++) {
            const vaultItem = items[idx]

            content += `${vaultItem.username}\n${vaultItem.message}\n\n`
        }

        const blob = new Blob([content], { type: 'text/plain' });

        // Create a temporary URL for the blob
        const url = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = "timecapsule.txt";

        // Append the link to the document body
        document.body.appendChild(link);

        // Simulate a click on the link to trigger the download
        link.click();

        // Clean up the URL object
        URL.revokeObjectURL(url);

        // Remove the link from the document body
        document.body.removeChild(link);
    }

    async function retrieveItems() {
        try {
            const response = await fetch("http://localhost:3000/api/vault/items");
            const { messages }: { messages: VaultItem[] } = await response.json();

            setItems(messages);
            setLoading(false);
        } catch (err) {
            alert(`[Error] ${err}`);
        }
    }

    async function onAccept(vaultItemId: number) {
        try {
            const response = await fetch("http://localhost:3000/api/vault/approve", {
                method: "POST",
                body: JSON.stringify({
                    id: vaultItemId,
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            const { approvedItem }: { approvedItem: VaultItem } = await response.json();

            setItems(items.map(vaultItem => vaultItem.id === approvedItem.id ? approvedItem : vaultItem))
        } catch (err) {
            alert(`[Error] ${err}`);
        }
    }

    async function onDecline(vaultItemId: number) {
        try {
            const response = await fetch("http://localhost:3000/api/vault/reject", {
                method: "POST",
                body: JSON.stringify({
                    id: vaultItemId,
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            const { messages }: { messages: VaultItem[] } = await response.json();

            setItems(messages);
        } catch (err) {
            alert(`[Error] ${err}`);
        }
    }

    // Polling database for changes
    useEffect(() => {
        setTimeout(() => {
            retrieveItems();
        }, POLLING_TIME);
    })

    if (loading) {
        return null;
    }

    return (
        <PageWrapper>
            <div className="flex justify-between gap-12">
                <div className="flex flex-col gap-4 w-full">
                    <h1 className="text-4xl text-white font-medium">Pending Vault Items</h1>
                    {
                        items.filter(item => item.pending).map(vaultItem =>
                            <VaultItemContainer key={vaultItem.id} vaultItem={vaultItem} onAccept={onAccept} onDecline={onDecline} />
                        )
                    }
                </div>

                <div className="flex flex-col gap-4 w-full">
                    <h1 className="text-4xl text-white font-medium">Accepted Items</h1>
                    {
                        items.filter(item => !item.pending).map(vaultItem =>
                            <VaultItemContainer key={vaultItem.id} vaultItem={vaultItem} onAccept={onAccept} onDecline={onDecline} />
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
