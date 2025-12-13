import React from 'react'

/**
 * icons
 */
import SearchIcon from '@mui/icons-material/Search';

const ChatAside = () => {
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

            <div className="flex-1 overflow-y-auto no-scrollbar">

                <div className="cursor-pointer border-l-[3px] border-primary bg-blue-500/5 transition-colors">
                    <div className="flex items-center gap-4 px-4 py-3 justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="relative shrink-0">
                                <div className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12" data-alt="Portrait of a young woman with glasses smiling"
                                    style={{
                                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDxTsgul7wL3rc83AmKyY1wZl3nRUPpH6BQKzk3TZma53kpn0nWjEM00eSSMe9y1HYtrW3Fi0MLOJmV5iULwt7Ae0wH4bzbdMpOYGkQyQbLmph9iJgN_RVk1e40rP_fNBkmKhJ2lkkB6Bjlx2hysGxZ-fke3wT3QXi2vo9AxRuYYbb0YSKpF_97Gfe1jL15cXRRYIRugaiWMOVzRY0w5vG82eW-EiL0OuyMgXmenc12KEd76uzvW3OG7ZOV39rfkrDRaGIRPzpaf9yf")'
                                    }}
                                ></div>
                                <div className="absolute bottom-0 right-0 size-3 rounded-full bg-green-500 border-2 border-surface-light dark:border-surface-dark"></div>
                            </div>
                            <div className="flex flex-col justify-center min-w-0">
                                <p className="text-[#0d171b] text-sm font-semibold leading-tight truncate">Alice Writer</p>
                                <p className="text-blue-500 text-xs font-medium leading-normal truncate">Typing...</p>
                            </div>
                        </div>
                        <div className="shrink-0 flex flex-col items-end gap-1">
                            <p className="text-[#4c809a] text-xs font-normal">Now</p>
                        </div>
                    </div>
                </div>

                <div className="cursor-pointer border-l-[3px] border-transparent hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4 px-4 py-3 justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="relative shrink-0">
                                <div className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12" data-alt="Portrait of a middle aged man with beard"
                                    style={{
                                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDxTsgul7wL3rc83AmKyY1wZl3nRUPpH6BQKzk3TZma53kpn0nWjEM00eSSMe9y1HYtrW3Fi0MLOJmV5iULwt7Ae0wH4bzbdMpOYGkQyQbLmph9iJgN_RVk1e40rP_fNBkmKhJ2lkkB6Bjlx2hysGxZ-fke3wT3QXi2vo9AxRuYYbb0YSKpF_97Gfe1jL15cXRRYIRugaiWMOVzRY0w5vG82eW-EiL0OuyMgXmenc12KEd76uzvW3OG7ZOV39rfkrDRaGIRPzpaf9yf")'
                                    }}></div>
                            </div>
                            <div className="flex flex-col justify-center min-w-0">
                                <p className="text-[#0d171b] text-sm font-semibold leading-tight truncate">Editor Mark</p>
                                <p className="text-[#0d171b] text-xs font-medium leading-normal truncate">Can we discuss the draft?</p>
                            </div>
                        </div>
                        <div className="shrink-0 flex flex-col items-end gap-1">
                            <p className="text-blue-500 text-xs font-bold">1h ago</p>
                            <div className="flex size-5 items-center justify-center rounded-full bg-blue-500 text-white text-[10px] font-bold">2</div>
                        </div>
                    </div>
                </div>

                <div className="cursor-pointer border-l-[3px] border-transparent hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4 px-4 py-3 justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="relative shrink-0">
                                <div className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 bg-gray-200 flex items-center justify-center text-gray-500" data-alt="Generic robot avatar icon" style={{
                                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDxTsgul7wL3rc83AmKyY1wZl3nRUPpH6BQKzk3TZma53kpn0nWjEM00eSSMe9y1HYtrW3Fi0MLOJmV5iULwt7Ae0wH4bzbdMpOYGkQyQbLmph9iJgN_RVk1e40rP_fNBkmKhJ2lkkB6Bjlx2hysGxZ-fke3wT3QXi2vo9AxRuYYbb0YSKpF_97Gfe1jL15cXRRYIRugaiWMOVzRY0w5vG82eW-EiL0OuyMgXmenc12KEd76uzvW3OG7ZOV39rfkrDRaGIRPzpaf9yf")'
                                }}></div>
                            </div>
                            <div className="flex flex-col justify-center min-w-0">
                                <p className="text-[#0d171b] text-sm font-semibold leading-tight truncate">Community Bot</p>
                                <p className="text-[#4c809a] text-xs font-normal leading-normal truncate">Welcome to the platform.</p>
                            </div>
                        </div>
                        <div className="shrink-0 flex flex-col items-end gap-1">
                            <p className="text-[#4c809a] text-xs font-normal">Yesterday</p>
                        </div>
                    </div>
                </div>

                <div className="cursor-pointer border-l-[3px] border-transparent hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4 px-4 py-3 justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="relative shrink-0">
                                <div className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12" data-alt="Portrait of a young woman with curly hair" style={{
                                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDxTsgul7wL3rc83AmKyY1wZl3nRUPpH6BQKzk3TZma53kpn0nWjEM00eSSMe9y1HYtrW3Fi0MLOJmV5iULwt7Ae0wH4bzbdMpOYGkQyQbLmph9iJgN_RVk1e40rP_fNBkmKhJ2lkkB6Bjlx2hysGxZ-fke3wT3QXi2vo9AxRuYYbb0YSKpF_97Gfe1jL15cXRRYIRugaiWMOVzRY0w5vG82eW-EiL0OuyMgXmenc12KEd76uzvW3OG7ZOV39rfkrDRaGIRPzpaf9yf")'
                                }}></div>
                            </div>
                            <div className="flex flex-col justify-center min-w-0">
                                <p className="text-[#0d171b] text-sm font-semibold leading-tight truncate">Sarah Jenkins</p>
                                <p className="text-[#4c809a] text-xs font-normal leading-normal truncate">Thanks for the feedback!</p>
                            </div>
                        </div>
                        <div className="shrink-0 flex flex-col items-end gap-1">
                            <p className="text-[#4c809a] text-xs font-normal">Tue</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default ChatAside
