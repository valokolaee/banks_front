// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
 import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css';

import { Provider } from "react-redux";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from "./redux/store";
let persistor = persistStore(store);


AOS.init({

  duration: 800,
  easing: 'ease-in-out',

});



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);