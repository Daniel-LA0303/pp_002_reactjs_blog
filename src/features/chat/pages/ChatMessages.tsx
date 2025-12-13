import React from 'react'

/**
 * icons
 */
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import ChatHeader from '../componentes/ChatHeader';
import ChatFooter from '../componentes/ChatFooter';

const ChatMessages = () => {
    return (
        <main className="flex flex-1 w-full overflow-hidden relative">

            <section className="hidden h-screen md:flex flex-col flex-1 bg-background-light relative">

                {/* header chat */}
                <ChatHeader />

                <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">

                    <div className="flex justify-center">
                        <span className="bg-gray-200 text-[#4c809a] text-xs font-medium px-3 py-1 rounded-full">Yesterday</span>
                    </div>

                    <div className="flex gap-3 max-w-[80%]">
                        <div className="bg-center bg-no-repeat bg-cover rounded-full h-8 w-8 self-end mb-1" data-alt="Portrait of a young woman with glasses smiling" style={{
                            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDxTsgul7wL3rc83AmKyY1wZl3nRUPpH6BQKzk3TZma53kpn0nWjEM00eSSMe9y1HYtrW3Fi0MLOJmV5iULwt7Ae0wH4bzbdMpOYGkQyQbLmph9iJgN_RVk1e40rP_fNBkmKhJ2lkkB6Bjlx2hysGxZ-fke3wT3QXi2vo9AxRuYYbb0YSKpF_97Gfe1jL15cXRRYIRugaiWMOVzRY0w5vG82eW-EiL0OuyMgXmenc12KEd76uzvW3OG7ZOV39rfkrDRaGIRPzpaf9yf")'
                        }}></div>
                        <div className="flex flex-col gap-1">
                            <div className="bg-white p-4 rounded-2xl rounded-bl-sm shadow-sm border border-transparent">
                                <p className="text-[#0d171b] text-sm leading-relaxed">Hey! I just read your latest post about minimalist design. It was really inspiring!</p>
                            </div>
                            <span className="text-[#4c809a] text-[10px] pl-1">10:23 AM</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 self-end max-w-[80%] items-end">
                        <div className="bg-blue-500 p-4 rounded-2xl rounded-br-sm shadow-sm text-white">
                            <p className="text-sm leading-relaxed">Thanks Alice! I'm glad you liked it. I've been trying to simplify my workflow lately.</p>
                        </div>
                        <div className="flex items-center gap-1 pr-1">
                            <span className="text-[#4c809a] text-[10px]">10:25 AM</span>
                            <span className="material-symbols-outlined text-[14px] text-blue-500"><DoneAllOutlinedIcon fontSize='small'/></span>
                        </div>
                    </div>

                    <div className="flex gap-3 max-w-[80%]">
                        <div className="bg-center bg-no-repeat bg-cover rounded-full h-8 w-8 self-end mb-1" data-alt="Portrait of a young woman with glasses smiling" style={{
                            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDxTsgul7wL3rc83AmKyY1wZl3nRUPpH6BQKzk3TZma53kpn0nWjEM00eSSMe9y1HYtrW3Fi0MLOJmV5iULwt7Ae0wH4bzbdMpOYGkQyQbLmph9iJgN_RVk1e40rP_fNBkmKhJ2lkkB6Bjlx2hysGxZ-fke3wT3QXi2vo9AxRuYYbb0YSKpF_97Gfe1jL15cXRRYIRugaiWMOVzRY0w5vG82eW-EiL0OuyMgXmenc12KEd76uzvW3OG7ZOV39rfkrDRaGIRPzpaf9yf")'
                        }}></div>
                        <div className="flex flex-col gap-1">
                            <div className="bg-white p-4 rounded-2xl rounded-bl-sm shadow-sm border border-transparent">
                                <p className="text-[#0d171b] text-sm leading-relaxed">Definitely. Less is more. Are you planning to cover color theory next?</p>
                            </div>
                            <span className="text-[#4c809a] text-[10px] pl-1">10:30 AM</span>
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                        <span className="bg-gray-200 text-[#4c809a] text-xs font-medium px-3 py-1 rounded-full">Today</span>
                    </div>

                    <div className="flex flex-col gap-1 self-end max-w-[80%] items-end">
                        <div className="bg-blue-500 p-4 rounded-2xl rounded-br-sm shadow-sm text-white">
                            <p className="text-sm leading-relaxed">Yes! That's actually what I'm drafting right now. Do you have any resources you'd recommend?</p>
                        </div>
                        <div className="flex items-center gap-1 pr-1">
                            <span className="text-[#4c809a] text-[10px]">09:15 AM</span>
                            <span className="material-symbols-outlined text-[14px] text-blue-500"><DoneAllOutlinedIcon fontSize='small' /></span>
                        </div>
                    </div>
                    <div className="flex gap-3 max-w-[80%]">
                        <div className="bg-center bg-no-repeat bg-cover rounded-full h-8 w-8 self-end mb-1" data-alt="Portrait of a young woman with glasses smiling" style={{
                            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDxTsgul7wL3rc83AmKyY1wZl3nRUPpH6BQKzk3TZma53kpn0nWjEM00eSSMe9y1HYtrW3Fi0MLOJmV5iULwt7Ae0wH4bzbdMpOYGkQyQbLmph9iJgN_RVk1e40rP_fNBkmKhJ2lkkB6Bjlx2hysGxZ-fke3wT3QXi2vo9AxRuYYbb0YSKpF_97Gfe1jL15cXRRYIRugaiWMOVzRY0w5vG82eW-EiL0OuyMgXmenc12KEd76uzvW3OG7ZOV39rfkrDRaGIRPzpaf9yf")'
                        }}></div>
                        <div className="flex flex-col gap-1">
                            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-transparent w-fit">
                                <div className="flex gap-1">
                                    <span className="size-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                    <span className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <ChatFooter />
                
            </section>
        </main>
    )
}

export default ChatMessages
