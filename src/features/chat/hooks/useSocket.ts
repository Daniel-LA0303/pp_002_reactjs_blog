// hooks/useWebSocket.ts
import { useRef, useCallback } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';


// hook web socket
export const useWebSocket = (onMessage: (data: any) => void) => {

  // stomp client
  const stompClientRef = useRef<Client | null>(null);

  // connect ref
  const connectedRef = useRef(false);

  // connecting
  const connectingRef = useRef(false); 

  // useCallback to connect
  const connect = useCallback((token: string, userId: string) => {

    // if there is a conecction then not do it again
    if (connectedRef.current || connectingRef.current) {
      return;
    }

    connectingRef.current = true;

    // conecction
    const client = new Client({

      // wbe socket
      webSocketFactory: () => new SockJS('http://192.168.100.3:8080/ws'),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      // when we are connected 
      onConnect: () => {
        // change states
        connectedRef.current = true;
        connectingRef.current = false;

        // suscribe to server
        client.subscribe(`/user/${userId}/chat`, (message: IMessage) => {
          console.log('WS RAW BODY:', message.body);
          onMessage(JSON.parse(message.body)); // <- receive response from web socket
        });
      },

      // disconnect client
      onDisconnect: () => {
        connectedRef.current = false;
        connectingRef.current = false;
      },

      reconnectDelay: 0,
    });

    stompClientRef.current = client;
    client.activate();
  }, [onMessage]);


  // call back to disconnect a reset state
  const disconnect = useCallback(() => {
    stompClientRef.current?.deactivate();
    stompClientRef.current = null;
    connectedRef.current = false;
    connectingRef.current = false;
  }, []);

  return {
    connect,
    disconnect,
    isConnected: connectedRef.current,
  };
};
