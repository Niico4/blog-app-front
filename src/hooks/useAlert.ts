import { useState } from 'react';

interface Alert {
  message: string;
  error: boolean;
}

const useAlert = () => {
  const [alert, setAlert] = useState<Alert>({
    message: '',
    error: false,
  });

  const showAlert = (message: string, error: boolean) => {
    setAlert({ message, error });
    setTimeout(() => setAlert({ message: '', error: false }), 2000);
  };

  return {
    alert,
    showAlert,
  };
};

export default useAlert;
