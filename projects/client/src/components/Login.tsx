import React, { useState } from 'react';
import logo from '../logo.svg';
import '../App.css';

interface LoginProps {
  setUsername: (username: string) => void;
}
const Login: React.FC<LoginProps> = (props) => {
  const [input, setInput] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.setUsername(input);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="name" value={input} onChange={onChange} />
          </label>
          <input type="submit" value="Submit" disabled={!input} />
        </form>
      </header>
    </div>
  );
};

export default Login;
