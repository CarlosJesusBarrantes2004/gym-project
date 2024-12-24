import { useState, useEffect } from 'react';

import MessageContext from './MessageContext';

const MessageProvider = ({ children }) => {
  const [errors, setErrors] = useState(null);
  const [successes, setSuccesses] = useState(null);

  useEffect(() => {
    let timeout;

    if (errors || successes) {
      timeout = setTimeout(() => {
        setErrors(null);
        setSuccesses(null);
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [errors, successes]);

  return (
    <MessageContext.Provider
      value={{ errors, setErrors, successes, setSuccesses }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
