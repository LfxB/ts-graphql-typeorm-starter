import { useSubscription } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import '../../App.css';
import { SUBSCRIPTION_CHAT_EVENT } from '../../graphql/services/room.service';
import { ROOM_ID, ROOM_TOPIC } from '../../utils/constants';
import FlashMessage from './FlashMessage';

interface MessagesProps {}
const Messages: React.FC<MessagesProps> = (props) => {
  const { data, loading, error } = useSubscription(SUBSCRIPTION_CHAT_EVENT, {
    variables: { roomId: ROOM_ID, topic: ROOM_TOPIC }
  });
  const [messages, setMessages] = useState<any>({});

  useEffect(() => {
    if (!loading && data && data.subscriptionChatEvent) {
      const {
        message: { message, sendTime }
      } = data.subscriptionChatEvent;
      console.log(message, sendTime);
      setMessages((prev: any) => ({
        ...prev,
        [sendTime]: message
      }));
    }
  }, [data, loading, error]);

  const deleteMessage = (id: string) => {
    setMessages((prev: any) => {
      const msgs = { ...prev };
      if (id in msgs) {
        delete msgs[id];
      }
      return msgs;
    });
  };

  const getMessagesViews = () => {
    const messagesViews: any[] = [];
    for (const sendTime in messages) {
      if (Object.prototype.hasOwnProperty.call(messages, sendTime)) {
        const message = messages[sendTime];
        messagesViews.push(
          <FlashMessage
            key={sendTime}
            message={message}
            id={sendTime}
            deleteMessage={deleteMessage}
          />
        );
      }
    }

    return messagesViews;
  };

  return <div className="Messages">{getMessagesViews()}</div>;
};

export default Messages;
