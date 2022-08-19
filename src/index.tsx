import { StrictMode } from 'react';
import ReactDOMClient from 'react-dom/client';
import { App } from '@/components/App';
import './index.scss';

const rootContainer = document.createElement('div');
document.body.appendChild(rootContainer);
const root = ReactDOMClient.createRoot(rootContainer);
root.render(
   <StrictMode>
      <App />
   </StrictMode>
);
