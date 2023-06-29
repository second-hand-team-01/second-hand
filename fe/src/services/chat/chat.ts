// import React, { useEffect, useState } from 'react';

// const WebSocketExample: React.FC = () => {
//   const [ws, setWs] = useState<WebSocket | null>(null);

//   useEffect(() => {
//     const webSocket = new WebSocket(
//       'wss://plyhldjlb8.execute-api.us-east-1.amazonaws.com/dev'
//     );

//     webSocket.onopen = () => {
//       console.log('connected');
//     };

//     webSocket.onmessage = (ev) => {
//       console.log(ev.data);
//     };

//     webSocket.onerror = (err) => {
//       console.log('error', err);
//     };

//     webSocket.onclose = () => {
//       console.log('closed');
//     };

//     setWs(webSocket);

//     return () => {
//       webSocket.close();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (ws) {
//       const message = {
//         action: 'message',
//         prompt: '안녕하세요... 혹시 지금도 판매하시나요 맥북에어',
//       };
//       ws.send(JSON.stringify(message));
//     }
//   };

//   return (
//     <div>
//       <button onClick={sendMessage}>Send Message</button>
//     </div>
//   );
// };

// export default WebSocketExample;
