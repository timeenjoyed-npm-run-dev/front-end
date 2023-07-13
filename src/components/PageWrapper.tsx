export default function PageWrapper({ children }) {
    return (
        <div className="h-screen bg-gradient-to-b from-[#330e51] to-[#cd9cf4]">
            <div className="pt-20 mb-10 mx-auto px-5 w-full lg:px-0 lg:max-w-[90ch]">
                { children }
            </div>
        </div>
    )
}
