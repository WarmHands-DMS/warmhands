// ToastContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');

  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
  };

  // Effect to show the toast when message changes
  useEffect(() => {
    if (toastMessage) {
      toast[toastType](toastMessage);
      setToastMessage(null); // Clear message after showing
    }
  }, [toastMessage, toastType]);

  return (
    <ToastContext.Provider value={showToast}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
