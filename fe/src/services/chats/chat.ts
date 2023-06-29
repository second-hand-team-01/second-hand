import { chatStorageKey } from '@constants/chat';
import { ChatListProps, MessageObj } from '@type-store/services/chat';

export const getAllChatFromStorage = (): ChatListProps[] | null => {
  const prevChatsStr = localStorage.getItem(chatStorageKey);
  let prevChats = {};
  if (!prevChatsStr) return null;
  prevChats = JSON.parse(prevChatsStr);
  return prevChats as ChatListProps[];
};

export const getItemChatFromStorage = (
  itemIdx: number,
  memberIdx: number
): { error: Error | null; data: ChatListProps[] } => {
  const chatInfos = getAllChatFromStorage();
  if (!chatInfos) {
    return { error: new Error('채팅 목록이 존재하지 않습니다.'), data: [] };
  }
  const filtered = chatInfos.filter((info) => {
    return info.itemIdx === itemIdx && info.user.memberIdx === memberIdx;
  });

  return { error: null, data: filtered };
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

export const setChatInfo = (chatInfo: ChatListProps) => {
  localStorage.setItem(chatStorageKey, JSON.stringify([chatInfo]));
};

// export const startNewChatsToStorage = (newChatInfo: ChatInfo) => {
//   const prevChatInfos = getAllChatFromStorage();
//   if (!prevChatInfos) {
//     const newChatInfos = [newChatInfo];
//     const newChatInfoStr = JSON.stringify(newChatInfos);
//     localStorage.postItem(chatStorageKey, newChatInfoStr);
//     return;
//   }
//   const hasChat = prevChatInfos.length !== 0;
//   const newChatInfos = hasChat
//     ? [...prevChatInfos, newChatInfo]
//     : [newChatInfo];
//   const newChatInfoStr = JSON.stringify(newChatInfos);
//   localStorage.postItem(chatStorageKey, newChatInfoStr);
// };
