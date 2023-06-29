import { ChatRoom, MessageObj, SendMessage } from '@type-store/services/chat';
import { useEffect, useState } from 'react';

export const useChat = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<MessageObj[]>([]);
  const [chatroom, setChatroom] = useState<ChatRoom | null>(null);

  const isInternalError = (message: string) => {
    return message === `Internal server error`;
  };

  useEffect(() => {
    const webSocket = new WebSocket(
      process.env.REACT_APP_CHAT_WEBSOCKET_URL as string
    );

    webSocket.onopen = () => {
      console.log('connected');
    };

    webSocket.onmessage = (ev) => {
      const newMessageObj = JSON.parse(ev.data);
      if (isInternalError(newMessageObj.message)) return;
      setMessages((prevMessages) => [...prevMessages, newMessageObj]);
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

  return { messages, setMessages, sendMessage, chatroom, setChatroom };
};
