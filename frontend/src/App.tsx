import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContainer from "./components/auth/AuthContainer.tsx";

function App() {
    return (
        <Router>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false}
                            closeOnClick pauseOnHover draggable theme="light" />
            <Routes>
                <Route path="/login" element={<AuthContainer/>} />
            </Routes>
        </Router>
    )
}

export default App
