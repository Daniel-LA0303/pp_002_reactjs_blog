
const ChatUserCardSkeleton = () => {
    return (
        <div>
            <div className="border-l-[3px] border-primary bg-blue-500/5 animate-pulse">
                <div className="flex items-center gap-4 px-4 py-3 justify-between">

                    <div className="flex items-center gap-3 overflow-hidden">

                        <div className="relative shrink-0">
                            <div className="h-12 w-12 rounded-full bg-[#e6eef3]"></div>
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#c7dbe6] border-2 border-surface-light dark:border-surface-dark"></div>
                        </div>

                        <div className="flex flex-col justify-center min-w-0 space-y-2">
                            <div className="h-4 w-32 rounded bg-[#dbe7ee]"></div>
                            <div className="h-3 w-44 rounded bg-[#e6eef3]"></div>
                        </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-2">
                        <div className="h-3 w-14 rounded bg-[#dbe7ee]"></div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default ChatUserCardSkeleton
