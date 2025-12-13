import { Outlet } from 'react-router-dom'
import ChatAside from '../componentes/ChatAside'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useCallback, useEffect } from 'react';
import { useWebSocket } from '../hooks/useSocket';

const ChatLayout = () => {

  const userIdAuth = useSelector((state: RootState) => state.auth.userId);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  // Handle incoming WebSocket messages
  const handleMessage = useCallback((data: any) => {
    console.log('WebSocket message received:', data);
    // Process notifications or real-time updates
  }, []);

  // Initialize WebSocket
  const { connect } = useWebSocket(handleMessage);

  // Connect when user is authenticated
  useEffect(() => {
    if (accessToken && userIdAuth) {
      connect(accessToken, userIdAuth.toString());
    }
  }, [accessToken, userIdAuth, connect]);


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
