import React, { useEffect, useState } from 'react'

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

const ChatAside = () => {

    const [searchUser, setSearchUser] = useState<string>("");
    const [usersToChat, setUsersToChat] = useState<UserSearchChatDTO[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const { getChatsByUser, chatsByUser } = useChat();

    useEffect(() => {

        getChatsByUser();

    }, []);

    useEffect(() => {

        // search users to init a chat
        const getUsersToChat = async () => {

            if (searchUser.trim() === "") {
                setUsersToChat([]);
                return;
            }

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

        return () => clearTimeout(timer);

    }, [searchUser]);

    const clearSearch = () => {
        setSearchUser("");
        setUsersToChat([]);
    };


    return (
        <aside className="w-full md:w-96 flex flex-col border-r border-border-light bg-surface-light z-10">

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
                    // Mostrar resultados de búsqueda
                    <>
                        <div className="px-4 py-2 text-sm font-medium text-gray-500 border-b">
                            Resultados de búsqueda
                        </div>
                        {isSearching ? (
                            <div className="p-4 text-center text-gray-500">
                                Buscando...
                            </div>
                        ) : usersToChat.length > 0 ? (
                            usersToChat.map((user: UserSearchChatDTO) => (
                                <ChatUserToSearch
                                    key={user.userId}
                                    user={user}
                                    onClick={clearSearch} // Limpiar búsqueda al seleccionar
                                />
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500">
                                No se encontraron usuarios
                            </div>
                        )}
                    </>
                ) : (
                    // Mostrar chats normales
                    chatsByUser.length > 0 ? (
                        chatsByUser.map((c: ChatUserInfo) => (
                            <ChatUserCard
                                key={c.chatId}
                                chat={c}
                            />
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500">
                            No hay conversaciones
                        </div>
                    )
                )}

            </div>
        </aside>
    )
}

export default ChatAside
