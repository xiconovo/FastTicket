import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TicketDetailsPage from './pages/TicketDetailsPage';
import CreateTicketPage from './pages/CreateTicketPage';
import ClientInfoPage from './pages/ClientInfoPage';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
              <Route path="/home/ticket_details/:id" element={<PrivateRoute><TicketDetailsPage /></PrivateRoute>} />
              <Route path="/home/create_ticket" element={<PrivateRoute><CreateTicketPage /></PrivateRoute>} />
              <Route path="/home/client_info" element={<PrivateRoute><ClientInfoPage /></PrivateRoute>} />
          </Routes>
      </Router>
  );
}

export default App;
