import { chatStorageKey } from '@constants/chat';
import {
  ChatDetailsProps,
  ChatInfo,
  ChatListProps,
  ChatPostBody,
  MessageObj,
} from '@type-store/services/chat';

export const getAllChatFromStorage = (): ChatPostBody | null => {
  const prevChatsStr = localStorage.getItem(chatStorageKey);
  let prevChats = {};
  if (!prevChatsStr) return null;
  prevChats = JSON.parse(prevChatsStr);
  return prevChats as ChatPostBody;
};

export const getItemChatFromStorage = (
  itemIdx: number,
  memberIdx: number
): { error: Error | null; data: ChatListProps[] } => {
  const chatInfos: ChatPostBody | null = getAllChatFromStorage();
  if (!chatInfos) {
    return { error: new Error('채팅 목록이 존재하지 않습니다.'), data: [] };
  }
  const targetInfoIdx = chatInfos.findIndex(
    (info) => info.itemIdx === itemIdx && info.memberIdx === memberIdx
  );
  const prevDetails = chatInfos[targetInfoIdx].list;
  return { error: null, data: prevDetails };
};

// export const getItemDetailFromStorage = (
//   itemIdx: number,
//   memberIdx: number
// ): { error: Error | null; data: ChatDetailsProps | null } => {
//   const chatInfos = getAllChatFromStorage();
//   if (!chatInfos) {
//     return { error: new Error('채팅 목록이 존재하지 않습니다.'), data: null };
//   }
//   const targetInfoIdx = chatInfos.findIndex(
//     (info) => info.itemIdx === itemIdx && info.memberIdx === memberIdx
//   );
//   return { error: null, data: chatInfos[targetInfoIdx] };
// };

export const startNewChatsToStorage = (newChatInfo: ChatInfo) => {
  const prevChatInfos = getAllChatFromStorage();
  if (!prevChatInfos) {
    const newChatInfos = [newChatInfo];
    const newChatInfoStr = JSON.stringify(newChatInfos);
    localStorage.postItem(chatStorageKey, newChatInfoStr);
    return;
  }
  const hasChat = prevChatInfos.length !== 0;
  const newChatInfos = hasChat
    ? [...prevChatInfos, newChatInfo]
    : [newChatInfo];
  const newChatInfoStr = JSON.stringify(newChatInfos);
  localStorage.postItem(chatStorageKey, newChatInfoStr);
};

// export const saveMessagesToStorage = (
//   itemIdx: number,
//   memberIdx: number,
//   messageObj: MessageObj
// ) => {
//   const chatInfos = getAllChatFromStorage();
//   if (!chatInfos) {
//     return { error: new Error('채팅 목록이 존재하지 않습니다.'), data: null };
//   }
//   const targetInfoIdx = chatInfos.findIndex(
//     (info) => info.itemIdx === itemIdx && info.memberIdx === memberIdx
//   );
//   const targetDetails = chatInfos[targetInfoIdx].details;
//   const prevMessages = targetDetails.messages;
//   chatInfos[targetInfoIdx].details.messages = [...prevMessages, messageObj];
//   const chatInfosStr = String(chatInfos);
//   localStorage.postItem(chatStorageKey, chatInfosStr);
// };
