
const ChatHeaderSkeleton = () => {
    return (
        <div className="flex items-center justify-between px-6 py-3 border-b border-border-light bg-surface-light/80 backdrop-blur-sm sticky top-0 z-10 animate-pulse">

            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#e6eef3] shadow-sm"></div>

                <div className="space-y-2">
                    <div className="h-4 w-32 rounded bg-[#dbe7ee]"></div>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#c7dbe6]"></div>
                        <div className="h-3 w-16 rounded bg-[#dbe7ee]"></div>
                    </div>
                </div>
            </div>

            <div className="flex gap-1">
                <div className="h-10 w-10 rounded-lg bg-[#e6eef3]"></div>
                <div className="h-10 w-10 rounded-lg bg-[#e6eef3]"></div>
                <div className="h-10 w-10 rounded-lg bg-[#e6eef3]"></div>
            </div>

        </div>

    )
}

export default ChatHeaderSkeleton
