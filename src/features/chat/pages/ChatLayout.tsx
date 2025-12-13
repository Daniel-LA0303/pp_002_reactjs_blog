import { Outlet } from 'react-router-dom'
import ChatAside from '../componentes/ChatAside'

const ChatLayout = () => {
  return (
    <div className="flex h-screen">
      {/* aside*/}
      <ChatAside />
      
      {/* chat area*/}
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  )
}

export default ChatLayout
