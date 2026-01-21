import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import ProtectRoute from "./components/ProtectRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./components/AuthLayout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
    <Toaster/>  
      <Routes>
        {/* Login with AuthLayout */}
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />

        {/* Signup with AuthLayout */}
        <Route path="/signup" element={<AuthLayout><Signup /></AuthLayout>} />

        {/* Protected Home Page */}
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
