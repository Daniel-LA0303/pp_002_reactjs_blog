import { useEffect, useState } from 'react'

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

const ChatMessages = () => {

    const { chatId } = useParams<{ chatId: string }>();
    const [messages, setMessages] = useState<MessageResponseDTO[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (chatId) {
            loadChatData(chatId);
        }
    }, [chatId]);

    const loadChatData = async (id: string) => {
        setLoading(true);
        try {
            const res = await apiAuthClient.get(`/v1/messages/chat/${id}`);
            const data = res.data;
            setMessages(data);
        } catch (error) {
            console.error('Error loading chat:', error);
        } finally {
            setLoading(false);
        }
    };


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
                                {messages.map((message) => (
                                    <ChatMessage key={message.id} message={message} />
                                ))}
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
