import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, isLoading } = useContext(AuthContext);

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/home" element={user ? <Home /> : <Signup />} />
            <Route path="/signin" element={user ? <Home /> : <Signin />} />
            <Route path="/signup" element={user ? <Home /> : <Signup />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
          <Footer />
        </Router>
      )}
    </>
  );
}

export default App;
