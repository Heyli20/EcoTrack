import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContainer from "./components/auth/AuthContainer.tsx";
import Dashboard from "./components/pages/Dashboard.tsx";
import WasteHistory from "./components/pages/WasteHistory.tsx";
import Collections from "./components/pages/Collections.tsx";

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
            </Routes>
        </Router>
    )
}

export default App
