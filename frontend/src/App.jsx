import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard"
import { Provider } from "react-redux";
import {AppStore,persistor} from "../utils/Appstore";
import { PersistGate } from "redux-persist/integration/react";
import Profile from './components/Profile';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <Provider store={AppStore}>
      <PersistGate loading={null} persistor={persistor}>
          <Router>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/dashboard" element={< Dashboard/>} />  
            <Route path="/profile" element={< Profile/>} />  
          </Routes>
          <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                backgroundColor: '#222a3f',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #dd1d5d',
              },
              duration: 5000,
            },
            error: {
              style: {
                backgroundColor: '#222a3f',
                color: 'rgb(213, 29, 29)',
                padding: '12px 24px',
                borderRadius: '8px',
                border: '1px solid #dd1d5d',
              },
              duration: 4000,
            },
          }}
        />
        </Router>

      </PersistGate>
    </Provider>

  )
}

export default App