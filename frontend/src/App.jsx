import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn"
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
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/dashboard" element={< Dashboard/>} />  
            <Route path="/profile" element={< Profile/>} />  
          </Routes>
          <Toaster/>
        </Router>

      </PersistGate>
    </Provider>

  )
}

export default App