import { Toaster } from 'react-hot-toast';

export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <Toaster position="top-right" toastOptions={{
        style: { background: '#18121F', color: '#FF69B4', fontWeight: 'bold' },
        success: { iconTheme: { primary: '#FF69B4', secondary: '#fff' } },
        error: { iconTheme: { primary: '#FF69B4', secondary: '#fff' } },
      }} />
    </>
  );
}
