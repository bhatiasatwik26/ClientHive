import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard"
import { Provider } from "react-redux";
import {AppStore,persistor} from "../utils/Appstore";
import { PersistGate } from "redux-persist/integration/react";
import Profile from './components/Profile';
import { Toaster } from 'react-hot-toast';
import CallNotif from './components/CallNotif';
const App = () => {
  return (
    <Provider store={AppStore}>
      <PersistGate loading={null} persistor={persistor}>
          <Router>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/dashboard" element={< Dashboard/>} />  
            <Route path="/profile" element={< CallNotif/>} />  
          </Routes>
          <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                backgroundColor: '#1d2437',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                border: '2px solid green',
              },
              duration: 2500,
            },
            error: {
              style: {
                backgroundColor: '#1d2437',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
                border: '2px solid #dd1d5d',
              },
              duration: 1500,
            },
          }}
        />
        </Router>

      </PersistGate>
    </Provider>

  )
}

export default App