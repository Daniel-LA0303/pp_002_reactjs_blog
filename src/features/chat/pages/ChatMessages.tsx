import { useEffect, useRef, useState } from 'react'

/**
 * icons
 */
import ChatHeader from '../componentes/ChatHeader';
import ChatFooter from '../componentes/ChatFooter';
import { useParams } from 'react-router-dom';
import { MessageResponseDTO } from '../types/message';
import apiAuthClient from '../../../services/config-client/apiAuthClient';
import ChatMessage from '../componentes/ChatMessage';
import Spinner from './../../../components/Spinner/Spinner';
import { useChat } from '../../../context/chatcontext/ChatContext';

const ChatMessages = () => {

    const { chatId } = useParams<{ chatId: string }>();
    const { messages, setMessages, setActiveChat } = useChat();
    
    // loading state
    const [loading, setLoading] = useState(false);

    // scroll down
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    
    // ref chat in context
    useEffect(() => {
        setActiveChat(chatId ?? null);
    }, [chatId]);

    // charge messages
    useEffect(() => {
        if (chatId) {
            loadChatData(chatId);
        }
    }, [chatId]);

    // get messages form a chat
    const loadChatData = async (id: string) => {
        setLoading(true);
        try {
            const res = await apiAuthClient.get(`/v1/messages/chat/${id}`);
            setMessages(res.data); // state from context
        } finally {
            setLoading(false);
        }
    };


    // scroll down
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div>
            {
                loading ? <Spinner /> :
                    <main className="flex flex-1 w-full overflow-hidden relative">
                        <section className="hidden h-screen md:flex flex-col flex-1 bg-background-light relative">

                            {/* header chat */}
                            <ChatHeader />

                            {/* messages */}
                            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
                                {messages.map((message: MessageResponseDTO) => (
                                    <ChatMessage key={message.id} message={message} />
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* footer chat */}
                            <ChatFooter />
                        </section>
                    </main>
            }
        </div>
    )
}

export default ChatMessages
