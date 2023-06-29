import { chatStorageKey } from '@constants/chat';
import { ChatRoom, MessageObj } from '@type-store/services/chat';

export const getAllChatRooms = (): {
  error: Error | null;
  data: ChatRoom[] | null;
} => {
  const prevChatsStr = localStorage.getItem(chatStorageKey);
  let prevChats = {};
  if (!prevChatsStr)
    return { error: new Error('채팅 목록이 존재하지 않습니다.'), data: [] };
  prevChats = JSON.parse(prevChatsStr);
  return { error: null, data: prevChats as ChatRoom[] };
};

export const getItemChatRooms = (
  itemIdx: number
): { error: Error | null; data: ChatRoom[] | null } => {
  const { data: chatRooms } = getAllChatRooms();
  if (!chatRooms) {
    return { error: new Error('채팅 목록이 존재하지 않습니다.'), data: null };
  }
  const targetChatRoom = chatRooms.filter((chatroom) => {
    return chatroom.itemIdx === itemIdx;
  });
  if (!targetChatRoom) {
    return { error: new Error('채팅 목록이 존재하지 않습니다.'), data: null };
  }
  return { error: null, data: targetChatRoom };
};

export const getOneChatRoom = (
  itemIdx: number,
  memberIdx: number
): { error: Error | null; data: ChatRoom | null } => {
  const { data: chatRooms } = getAllChatRooms();
  if (!chatRooms) {
    return { error: new Error('채팅 목록이 존재하지 않습니다.'), data: null };
  }
  const targetChatRoom = chatRooms.find((chatroom, i) => {
    console.log(chatroom.user.memberIdx, memberIdx);

    return (
      chatroom.itemIdx === itemIdx && chatroom.user.memberIdx === memberIdx
    );
  });
  console.log(targetChatRoom);
  if (!targetChatRoom) {
    return {
      error: new Error('요청하신 채팅 목록이 존재하지 않습니다.'),
      data: null,
    };
  }
  return { error: null, data: targetChatRoom };
};

export const saveMessagesToStorage = (
  chatroom: ChatRoom,
  messageObjs: MessageObj[]
) => {
  const newChatRoom = { ...chatroom };
  newChatRoom.messages = messageObjs;
  const prevChatRoomsStr = localStorage.getItem(chatStorageKey);
  if (!prevChatRoomsStr) return;
  const prevChatRooms = JSON.parse(prevChatRoomsStr);
  const targetIdx = prevChatRooms.findIndex(
    (prvChatroom: ChatRoom) =>
      prvChatroom.itemIdx === chatroom.itemIdx &&
      prvChatroom.user.memberIdx === chatroom.user.memberIdx
  );
  prevChatRooms[targetIdx] = newChatRoom;
  const newChatRooms = JSON.stringify(prevChatRooms);
  localStorage.setItem(chatStorageKey, newChatRooms);
};

export const initChatRoomToLocalStorage = (chatroom: ChatRoom) => {
  const prevChatRoomStr = localStorage.getItem(chatStorageKey);
  if (!prevChatRoomStr) {
    localStorage.setItem(chatStorageKey, JSON.stringify([chatroom]));
    return;
  }
  const prevChatRoom = JSON.parse(prevChatRoomStr);
  const newChatRooms = [chatroom, ...prevChatRoom];
  localStorage.setItem(chatStorageKey, JSON.stringify(newChatRooms));
};
