// hooks/useWebSocket.ts
import { useEffect, useRef, useCallback } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const useWebSocket = (onMessage: (data: any) => void) => {
  // Store STOMP client instance
  const stompClientRef = useRef<Client | null>(null);

  // Connect to WebSocket server
  const connect = useCallback((token: string, userId: string) => {
    // Skip if already connected
    if (stompClientRef.current?.connected) return;

    // Create STOMP client
    const client = new Client({
      // Server endpoint
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      // Auth headers
      connectHeaders: { Authorization: `Bearer ${token}` },
      // On successful connection
      onConnect: () => {
        console.log('WebSocket connected');
        // Subscribe to user's private channel
        client.subscribe(`/user/${userId}/chat`, (message: IMessage) => {
          const data = JSON.parse(message.body);
          onMessage(data); // Forward to handler
        });
      },
      // Error handling
      onStompError: (frame) => console.error('STOMP error:', frame),
      // Auto-reconnect after 5s
      reconnectDelay: 5000
    });

    client.activate();
    stompClientRef.current = client;
  }, [onMessage]);

  // Disconnect from server
  const disconnect = useCallback(() => {
    stompClientRef.current?.deactivate();
    stompClientRef.current = null;
  }, []);

  // Send message to server
  const sendMessage = useCallback((destination: string, body: any) => {
    if (stompClientRef.current?.connected) {
      stompClientRef.current.publish({
        destination,
        body: JSON.stringify(body)
      });
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => disconnect, [disconnect]);

  return {
    connect,
    disconnect,
    sendMessage,
    isConnected: stompClientRef.current?.connected || false
  };
};