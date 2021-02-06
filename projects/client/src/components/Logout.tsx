import React from 'react';

interface LogoutProps {
  logout: () => void;
}
const Logout: React.FC<LogoutProps> = (props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.logout();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="submit" value="Logout" />
    </form>
  );
};

export default Logout;
