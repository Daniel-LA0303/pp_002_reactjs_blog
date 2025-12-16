import React, { useState } from 'react'

/**
 * icons
 */
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import apiAuthClient from '../../../services/config-client/apiAuthClient';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const ChatFooter = () => {

    // local state
    const [message, setMessage] = useState<string>("");
    const { chatId } = useParams<{ chatId: string }>();
    const userIdAuth = useSelector((state: RootState) => state.auth.userId);

    // to send a message
    const handleSend = async () => {
        if (!message.trim() || !chatId || !userIdAuth) return;

        try {
            const messageData = {
                content: message,
                senderId: userIdAuth,
                receiverId: 0,
                type: "TEXT",
                chatId: chatId
            };

            await apiAuthClient.post(`/v1/messages`, messageData);
            setMessage("");

        } catch (error) {
            console.log(error);
        }
    };

    // cancel multiple request
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="p-6 bg-surface-light border-t border-border-light sticky bottom-0 z-20">
            <div className="flex items-end gap-3 max-w-[960px] mx-auto">
                <button className="size-10 shrink-0 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100">
                    <AttachFileOutlinedIcon />
                </button>

                {/* input to send message */}
                <div className="flex-1 relative bg-background-light rounded-xl border border-gray-300 focus-within:border-blue-500 transition-all">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="w-full bg-transparent border-none focus:outline-none text-gray-900 placeholder:text-gray-500 py-3 px-4 text-sm"
                        placeholder="Type a message..."
                    />

                    <div className="absolute right-2 bottom-1.5">
                        <button className="size-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200">
                            <SentimentSatisfiedAltOutlinedIcon />
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="size-10 shrink-0 flex items-center justify-center rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    <SendOutlinedIcon />
                </button>
            </div>
        </div>
    );
};
export default ChatFooter
