import React from "react";
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { store } from "./redux";
import "./assets/css/grid.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from "./App";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>  
      <Provider store={store}>
        <App />
    </Provider>
    </React.StrictMode>
);