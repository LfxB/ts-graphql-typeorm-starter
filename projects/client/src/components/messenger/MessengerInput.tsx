import React, { useState } from 'react';
import '../../App.css';

interface MessengerInputProps {}
const MessengerInput: React.FC<MessengerInputProps> = (props) => {
  const [input, setInput] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="Messenger-input">
      <form onSubmit={handleSubmit}>
        <label style={{ fontSize: 18, padding: '0px 5px' }}>
          <p style={{ display: 'inline-block', padding: '0px 5px' }}>
            Message:
          </p>
          <input type="text" name="name" value={input} onChange={onChange} />
        </label>
        <input type="submit" value="Send" disabled={!input} />
      </form>
    </div>
  );
};

export default MessengerInput;
