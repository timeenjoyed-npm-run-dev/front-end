import { BsCheckLg, BsXOctagonFill } from 'react-icons/bs';

export interface VaultItem {
    id: number,
    username: string,
    content: string,
    pending: boolean,
}

export interface VaultItemProps {
    vaultItem: VaultItem,
    onAccept: (vaultItemId: number) => void,
    onDecline: (vaultItemId: number) => void,
}

export default function VaultItemContainer({ vaultItem, onAccept, onDecline }: VaultItemProps) {
    return (
        <div className="flex justify-between items-center min-h-min px-4 py-2 bg-white rounded-md">
            <div className="flex flex-col">
                <h3 className="opacity-75 text-lg">{vaultItem.username}</h3>
                <p className="text-2xl">{vaultItem.content}</p>
            </div>

            {vaultItem.pending && (
                <div className="flex justify-between gap-4 items-center">
                    <button onClick={() => onAccept(vaultItem.id)}><BsCheckLg size={45} className="text-lime-500" /></button>
                    <button onClick={() => onDecline(vaultItem.id)}><BsXOctagonFill size={35} className="text-red-600" /></button>
                </div>
            )}
        </div>
    )
}
