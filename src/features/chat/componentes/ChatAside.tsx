import React, { useEffect } from 'react'

/**
 * icons
 */
import SearchIcon from '@mui/icons-material/Search';
import { useChat } from '../../../context/chatcontext/ChatContext';
import { ChatUserInfo } from '../types/chat';
import ChatUserCard from './ChatUserCard';

const ChatAside = () => {

    const {getChatsByUser, chatsByUser} = useChat();
    useEffect(() => {

        getChatsByUser();

    }, []);

    return (
        <aside className="w-full md:w-96 flex flex-col border-r border-border-light bg-surface-light z-10">

            <div className="px-4 py-4 border-b border-border-light">
                <label className="flex flex-col h-10 w-full">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-background-light border border-border-light focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <div className="text-[#4c809a] flex items-center justify-center pl-3">
                            <span className="material-symbols-outlined text-[20px]"><SearchIcon /></span>
                        </div>
                        <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden bg-transparent text-[#0d171b] placeholder:text-[#4c809a] px-3 text-sm font-normal focus:outline-none" placeholder="Search conversations..." />
                    </div>
                </label>
            </div>

            {/* show chard messages */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                {
                chatsByUser.map((c: ChatUserInfo) => (
                    <ChatUserCard 
                    key={c.chatId}
                    chat={c}
                    />
                ))
                }
                
            </div>
        </aside>
    )
}

export default ChatAside
