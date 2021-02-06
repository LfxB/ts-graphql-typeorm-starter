import React from 'react';
import Login from './components/Login';
import useLocalStorage from './hooks/useLocalStorage';
import Messenger from './components/messenger/Messenger';

function App() {
  const [username, setUsername] = useLocalStorage('username', '');

  const logout = () => {
    setUsername('');
  };

  return (
    <div>
      {username ? (
        <Messenger username={username} logout={logout} />
      ) : (
        <Login setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
