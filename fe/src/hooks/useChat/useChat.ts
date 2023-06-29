import { MessageObj, SendMessage } from '@type-store/services/chat';
import { useEffect, useState } from 'react';

export const onChat = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<MessageObj[]>([]);

  useEffect(() => {
    const webSocket = new WebSocket(
      process.env.REACT_APP_CHAT_WEBSOCKET_URL as string
    );

    webSocket.onopen = () => {
      console.log('connected');
    };

    webSocket.onmessage = (ev) => {
      const newMessage = JSON.parse(ev.data) as MessageObj;
      if (newMessage.message === `Internal server error`) return;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    webSocket.onerror = (err) => {
      console.log('error', err);
    };

    webSocket.onclose = () => {
      console.log('closed');
    };

    setWs(webSocket);

    return () => {
      webSocket.close();
    };
  }, []);

  const sendMessage = (message: SendMessage) => {
    if (ws) {
      ws.send(JSON.stringify(message));
    }
  };

  return { messages, setMessages, sendMessage };
};
