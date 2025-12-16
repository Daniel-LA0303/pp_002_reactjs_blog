import { useEffect, useState } from 'react'

/**
 * icons
 */
import SearchIcon from '@mui/icons-material/Search';
import { useChat } from '../../../context/chatcontext/ChatContext';
import { ChatUserInfo, UserSearchChatDTO } from '../types/chat';
import ChatUserCard from './ChatUserCard';
import apiAuthClient from '../../../services/config-client/apiAuthClient';
import ChatUserToSearch from './ChatUserToSearch';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SpinnerSmall from '../../../components/Spinner/SpinnerSmall';
import ChatUserCardSkeleton from '../../../components/Skeletons/Chat/ChatUserCardSkeleton';

const ChatAside = () => {

    // local state to search chats
    const [searchUser, setSearchUser] = useState<string>("");
    const [usersToChat, setUsersToChat] = useState<UserSearchChatDTO[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [loadingChats, setLoadingChats] = useState<boolean>(false);

    const { getChatsByUser, chatsByUser } = useChat();

    useEffect(() => {
        try {
            setLoadingChats(true);
            getChatsByUser();
        } catch (error) {
            console.log(error);
        }finally{
            setLoadingChats(false);
        }
    }, []);

    useEffect(() => {

        // search users to init a chat
        const getUsersToChat = async () => {

            if (searchUser.trim() === "") {
                setUsersToChat([]);
                return;
            }
            setIsSearching(true);
            try {
                const res = await apiAuthClient.get(`/user/search/chat?query=${searchUser}`);
                console.log(res);
                setUsersToChat(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        const timer = setTimeout(() => {
            getUsersToChat();
        }, 500); // Debounce 500ms

        setIsSearching(false);
        return () => clearTimeout(timer);

    }, [searchUser]);

    // clear state
    const clearSearch = () => {
        setSearchUser("");
        setUsersToChat([]);
    };


    return (
        <aside className="w-full md:w-96 flex flex-col border-r border-border-light bg-surface-light z-10 mt-16">

            <div className="px-4 py-4 border-b border-border-light">
                <label className="flex flex-col h-10 w-full">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-background-light border border-border-light focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <div className="text-[#4c809a] flex items-center justify-center pl-3">
                            <span className="material-symbols-outlined text-[20px]"><SearchIcon /></span>
                        </div>
                        <input
                            onChange={(e) => setSearchUser(e.target.value)}
                            value={searchUser}
                            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden bg-transparent text-[#0d171b] placeholder:text-[#4c809a] px-3 text-sm font-normal focus:outline-none"
                            placeholder="Search conversations..."
                        />
                        {searchUser && (
                            <button
                                onClick={clearSearch}
                                className="text-[#4c809a] flex items-center justify-center pr-3 hover:text-gray-700"
                            >
                                <span className="material-symbols-outlined text-[20px]"><HighlightOffIcon /></span>
                            </button>
                        )}
                    </div>
                </label>
            </div>

            {/* show chard messages */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                {searchUser.trim() !== "" ? (
                    // show message
                    <>
                        <div className="px-4 py-2 text-sm font-medium text-gray-500 border-b">
                            Results form query
                        </div>
                        {!isSearching ? (
                            <div className="p-4 text-center text-gray-500">
                                <SpinnerSmall />
                            </div>
                        ) : usersToChat.length > 0 ? (
                            usersToChat.map((user: UserSearchChatDTO) => (
                                <ChatUserToSearch
                                    key={user.userId}
                                    user={user}
                                    onClick={clearSearch}
                                />
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500">
                                There are not a user with this username
                            </div>
                        )}
                    </>
                ) : (
                    // show normal chats
                    !loadingChats ? 
                    chatsByUser.length > 0 ? (
                        chatsByUser.map((c: ChatUserInfo) => (
                            <ChatUserCard
                                key={c.chatId}
                                chat={c}
                            />
                        ))
                    ) : (
                        <ChatUserCardSkeleton />
                    ) :
                    <div className="p-4 text-center text-gray-500">
                            There are not conversations, start searching one
                    </div>
                )}

            </div>
        </aside>
    )
}

export default ChatAside
