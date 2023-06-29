import { ReceivedMessage } from '@type-store/services/chat';
import React, { useEffect, useState } from 'react';

export const onChat = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<ReceivedMessage[]>([]); // 상태 추가

  useEffect(() => {
    const webSocket = new WebSocket(
      process.env.REACT_APP_CHAT_WEBSOCKET_URL as string
    );

    webSocket.onopen = () => {
      console.log('connected');
    };

    webSocket.onmessage = (ev) => {
      setMessages((prevMessages) => [...prevMessages, JSON.parse(ev.data)]); // 메시지 저장
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

  const sendMessage = (message: ReceivedMessage) => {
    if (ws) {
      ws.send(JSON.stringify(message));
    }
  };

  return { messages, setMessages, sendMessage };
};
