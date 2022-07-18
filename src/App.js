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
import NewStaff from './pages/NewStaff';
import Staffs from './pages/Staffs';
import Logout from './pages/Logout';
import {AppProvider} from './context/AppContext';
import ResolveDebts from './pages/ResolveDebts';
import Debts from './pages/Debts';
import SingleTransaction from './pages/SingleTransaction';
import Edit from './pages/Edit';
import Profile from './pages/Profile';
import Reports from './pages/Reports';
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
          <Route exact path="/transactions/:id" element={<SingleTransaction />} />
          <Route exact path="/edit/:id" element={<Edit />} />
          <Route path="/resolve-debts" element={<ResolveDebts />} />
          <Route path="/debts/:id" element={<Debts />} />
          <Route path="/new-staff" element={<NewStaff />} />
          <Route path="/staffs" element={<Staffs />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/receipt/:id" element={<Receipt />} />
          <Route path="/logout" element={<Logout />} />
          <Route exact path="*" element={<Error />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
