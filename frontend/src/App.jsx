import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import NotificationToast from './components/NotificationToast';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import BrowseGigs from './pages/BrowseGigs';
import PostGig from './pages/PostGig';
import GigDetails from './pages/GigDetails';
import MyGigs from './pages/MyGigs';
import GigBids from './pages/GigBids';
import MyBids from './pages/MyBids';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <div className="min-h-screen bg-black">
            <Navbar />
            <NotificationToast />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/browse" element={<BrowseGigs />} />
              <Route path="/gigs/:id" element={<GigDetails />} />

              <Route
                path="/post-gig"
                element={
                  <ProtectedRoute>
                    <PostGig />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-gigs"
                element={
                  <ProtectedRoute>
                    <MyGigs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gigs/:id/bids"
                element={
                  <ProtectedRoute>
                    <GigBids />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-bids"
                element={
                  <ProtectedRoute>
                    <MyBids />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
