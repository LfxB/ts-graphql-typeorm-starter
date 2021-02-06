import { gql } from '@apollo/client';

export const ENTER_ROOM = gql`
  mutation enterRoom($roomId: Float!) {
    enterRoom(roomId: $roomId)
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($text: String!) {
    sendMessage(text: $text)
  }
`;

export const SUBSCRIPTION_CHAT_EVENT = gql`
  subscription subscriptionChatEvent($roomId: Float!, $topic: String!) {
    subscriptionChatEvent(roomId: $roomId, topic: $topic) {
      action
      message {
        username
        message
        sendTime
      }
    }
  }
`;
