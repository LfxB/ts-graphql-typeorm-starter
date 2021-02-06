export const RoomChatEventTopic = (roomId: number | string) => {
  return `ROOM_CHAT_EVENT_IN_ROOM_${roomId}`;
};
