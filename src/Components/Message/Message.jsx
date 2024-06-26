import { useEffect, useState } from "react";
import './Message.css';
function Message({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(true);
      const hideTimer = setTimeout(() => setVisible(false), 3000); // Show for 3 seconds
      return () => clearTimeout(hideTimer);
    }, 300); // Delay before showing

    return () => clearTimeout(showTimer);
  }, []);

  return (
    <>
      <div
        className={`fixed top-0  transform -translate-x-1/2 mt-4 flex items-center justify-center z-50 ${
          visible ? 'slide-down' : 'hidden'
        }`}
      >
        <div className="bg-yellow-500 text-white font-bold text-lg p-4 rounded shadow-md">
          <p>{message}</p>
        </div>
      </div>
    </>
  );
}

export default Message;
