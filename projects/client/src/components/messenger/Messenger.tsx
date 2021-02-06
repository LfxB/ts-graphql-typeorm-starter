import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import '../../App.css';
import { ENTER_ROOM } from '../../graphql/services/room.service';
import { ROOM_ID } from '../../utils/constants';
import Logout from '../Logout';
import Messages from './Messages';
import MessengerInput from './MessengerInput';

interface MessengerProps {
  username: string;
  logout: () => void;
}
const Messenger: React.FC<MessengerProps> = (props) => {
  const [enterRoom, { data }] = useMutation(ENTER_ROOM);

  useEffect(() => {
    enterRoom({ variables: { roomId: ROOM_ID } });
  }, []);

  if (data && data.enterRoom) {
    console.log('ready', data);
  } else {
    console.log('not ready', data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Messenger-header">
          <div>
            <div>User: {props.username}</div>
            <Logout logout={props.logout} />
          </div>
        </div>
        {data && data.enterRoom ? (
          <div style={{ width: '100vw', height: '80vh' }}>
            <Messages />
          </div>
        ) : null}
        <div className="Messenger-footer">
          <div className="Messenger-input-container">
            <MessengerInput />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Messenger;
