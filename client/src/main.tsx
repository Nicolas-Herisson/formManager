import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import { UserContextProvider } from './providers/user.provider';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
