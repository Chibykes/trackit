import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Spendings from './pages/Spendings';
import Error from './pages/Error';
import Transactions from './pages/Transactions';
import Receipt from './pages/Receipt';
import Scan from './pages/Scan';
import Logout from './pages/Logout';
import {AppProvider} from './context/AppContext';
// import Splash from './component/Splash';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/sales" element={<Sales />} />
          <Route exact path="/spendings" element={<Spendings />} />
          <Route exact path="/transactions" element={<Transactions />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/trx/:id" element={<Receipt />} />
          <Route path="/logout" element={<Logout />} />
          <Route exact path="*" element={<Error />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
