import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppConfig } from './AppConfig';
const fs = window.require("fs")

const root = ReactDOM.createRoot(document.getElementById('root')!);

let config: AppConfig = JSON.parse(fs.readFileSync("./config.json", 'utf8'))
root.render(
  <React.StrictMode>
    <App appConfig={config}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
