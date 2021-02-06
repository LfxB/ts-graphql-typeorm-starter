import React from 'react';
import '../../App.css';
import Logout from '../Logout';
import MessengerInput from './MessengerInput';

interface MessengerProps {
  username: string;
  logout: () => void;
}
const Messenger: React.FC<MessengerProps> = (props) => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Messenger-header">
          <div>
            <div>User: {props.username}</div>
            <Logout logout={props.logout} />
          </div>
        </div>
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
