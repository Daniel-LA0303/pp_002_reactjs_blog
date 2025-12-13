import React from 'react'

/**
 * icons
 */
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';

const ChatFooter = () => {
    return (
        <div className="p-6 bg-surface-light border-t border-border-light sticky bottom-0 z-20">
            <div className="flex items-end gap-3 max-w-[960px] mx-auto">
                <button className="size-10 shrink-0 flex items-center justify-center rounded-full text-[#4c809a] hover:bg-gray-100 transition-colors">
                    <span className="material-symbols-outlined"><AttachFileOutlinedIcon /></span>
                </button>
                <div className="flex-1 relative bg-background-light rounded-xl border border-border-light focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
                    <textarea className="w-full bg-transparent border-none focus:ring-0 text-[#0d171b] placeholder:text-[#4c809a] py-3 px-4 text-sm resize-none rounded-xl max-h-32" placeholder="Type a message..." rows={1}></textarea>
                    <div className="absolute right-2 bottom-1.5 flex gap-1">
                        <button className="size-8 flex items-center justify-center rounded-lg text-[#4c809a] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <span className="material-symbols-outlined text-[20px]"><SentimentSatisfiedAltOutlinedIcon /></span>
                        </button>
                    </div>
                </div>
                <button className="size-10 shrink-0 flex items-center justify-center rounded-lg bg-blue-500 text-white hover:bg-sky-600 shadow-md transition-colors">
                    <span className="material-symbols-outlined text-[20px] ml-0.5"><SendOutlinedIcon /></span>
                </button>
            </div>
        </div>
    )
}

export default ChatFooter
