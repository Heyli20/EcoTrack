import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContainer from "./components/auth/AuthContainer.tsx";
import Dashboard from "./components/residents/pages/Dashboard.tsx";
import WasteHistory from "./components/residents/pages/WasteHistory.tsx";
import Collections from "./components/residents/pages/Collections.tsx";
import Payment from "./components/residents/pages/Payment.tsx";
import Settings from "./components/Settings.tsx";
import Profile from "./components/Profile.tsx";
import NotificationDetailPage from "./components/Notification.tsx";
import AdminDash from "./components/admin/pages/AdminDash.tsx";

function App() {
    return (
        <Router>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false}
                            closeOnClick pauseOnHover draggable theme="light" />
            <Routes>
                <Route path="/login" element={<AuthContainer/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/waste-history" element={<WasteHistory/>} />
                <Route path="/collections" element={<Collections/>} />
                <Route path="/payments" element={<Payment />} />
                <Route path="/settings" element={<Settings/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/notification/:id" element={<NotificationDetailPage/>} />

                {/* Admin */}
                <Route path="/adminDash" element={<AdminDash/>} />
            </Routes>
        </Router>
    )
}

export default App
