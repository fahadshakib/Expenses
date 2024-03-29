import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import {UserContextProvider} from './context/user.context';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
  <React.StrictMode>
    <BrowserRouter>
    <UserContextProvider>
      <App/>
    </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
  
);
