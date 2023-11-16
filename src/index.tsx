import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/index.css';
import App from './app/App';
import {StoreProvider} from "./app/providers/StoreProvider";
import {ThemeProvider} from "./app/providers/ThemeProvider";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <StoreProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StoreProvider>
  </BrowserRouter>
);
