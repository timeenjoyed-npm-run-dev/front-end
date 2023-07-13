export interface FloatingButtonProps {
    handleClick: () => void,
    children: React.ReactNode
}

export const FloatingButton = ({ handleClick, children }: FloatingButtonProps) => {
    return (
        <button
            onClick={() => handleClick()}
            className="fixed bottom-10 right-10 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer"
        >
            {children}
        </button>
    );
};
