import { Outlet } from 'react-router-dom'
import ChatAside from '../componentes/ChatAside'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useCallback, useEffect } from 'react';
import { useWebSocket } from '../hooks/useSocket';
import { useChat } from '../../../context/chatcontext/ChatContext';
import NavBar from '../../../components/NavBar/NavBar';

const ChatLayout = () => {

  const userIdAuth = useSelector((state: RootState) => state.auth.userId);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  // Handle incoming WebSocket messages
  const { handleNotification } = useChat();

  const handleMessage = useCallback((data: any) => {
    handleNotification(data);
  }, [handleNotification]);
  // Initialize WebSocket
  const { connect } = useWebSocket(handleMessage);

  // Connect when user is authenticated
  useEffect(() => {
    if (accessToken && userIdAuth) {
      connect(accessToken, userIdAuth.toString());
    }
  }, [accessToken, userIdAuth, connect]);


  return (
    <div>
      <NavBar />
      <div className="flex h-screen">

        {/* aside*/}
        <ChatAside />

        {/* chat area*/}
        <div className="flex-1 flex flex-col">
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default ChatLayout
