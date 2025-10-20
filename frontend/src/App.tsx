import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContainer from "./components/auth/AuthContainer.tsx";
import Navbar from "./nav/Navbar.tsx";

function App() {
    return (
        <Router>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false}
                            closeOnClick pauseOnHover draggable theme="light" />
            <Routes>
                <Route path="/login" element={<AuthContainer/>} />
                <Route path="/nav" element={<Navbar/>}/>
            </Routes>
        </Router>
    )
}

export default App
