import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import '../../App.css';
import { SEND_MESSAGE } from '../../graphql/services/room.service';

interface MessengerInputProps {}
const MessengerInput: React.FC<MessengerInputProps> = (props) => {
  const [input, setInput] = useState('');
  const [sendMessage, { data }] = useMutation(SEND_MESSAGE);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await sendMessage({ variables: { text: input } });
      setInput('');
    } catch (error) {
      alert('Message did not send.');
    }
  };

  return (
    <div className="Messenger-input">
      <form onSubmit={handleSubmit}>
        <label style={{ fontSize: 18, padding: '0px 5px' }}>
          <p style={{ display: 'inline-block', padding: '0px 5px' }}>
            Message:
          </p>
          <input type="text" value={input} onChange={onChange} />
        </label>
        <input type="submit" value="Send" disabled={!input} />
      </form>
    </div>
  );
};

export default MessengerInput;
