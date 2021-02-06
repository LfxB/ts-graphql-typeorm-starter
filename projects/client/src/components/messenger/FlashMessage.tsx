import React, { useEffect, useState } from 'react';
import '../../App.css';
import { getRandomInt } from '../../utils/math';

interface FlashMessageProps {
  message: string;
  id: string;
  deleteMessage: (id: string) => void;
}
const FlashMessage: React.FC<FlashMessageProps> = (props) => {
  const [dimensions] = useState({
    top: `${getRandomInt(0, 80)}%`,
    left: `${getRandomInt(0, 80)}%`
  });

  useEffect(() => {
    setTimeout(() => {
      props.deleteMessage(props.id);
    }, 3000);
  }, []);

  return (
    <div
      className="Flash-message"
      style={{ top: dimensions.top, left: dimensions.left }}
    >
      {props.message}
    </div>
  );
};

export default FlashMessage;
