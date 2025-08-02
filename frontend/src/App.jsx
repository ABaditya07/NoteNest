import { Routes, Route, Navigate, useLocation} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MyBlogs from "./pages/MyBlogs";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import ViewBlog from "./pages/ViewBlog";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoute";
import SavedBlogs from "./pages/SavedBlogs";
import Logout from "./pages/LogoutPage";
function App() {

  // Access the user data from AuthContext
  const { token, loading  } = useContext(AuthContext);

  // Use useLocation to get the current location
  // This can be useful for conditional rendering or redirects based on the current path
  const location = useLocation();

  // Check if current route is auth-related like path as /api/auth/login or /api/auth/signup
  const authPages = ["/login", "/signup"];
  const isAuthPage = authPages.includes(location.pathname);

  if (loading) {
  return (
    <div className="h-screen flex items-center justify-center">
      <span className="text-lg font-semibold">Loading...</span>
    </div>
  );
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        {!isAuthPage && <Header />}
        {!isAuthPage && <Navbar />}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
            <Route path="/home" element={<PrivateRoute> <Home /> </PrivateRoute>} />
            <Route path="/login" element={token ? <Navigate to="/home" /> : <LoginPage />} />
            <Route path="/signup" element={token ? <Navigate to="/home" /> : <SignupPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/create" element={<PrivateRoute> <CreateBlog /> </PrivateRoute>} />
            <Route path="/my-blogs" element={<PrivateRoute> <MyBlogs /> </PrivateRoute>} />
            <Route path="/edit/:id" element={<PrivateRoute> <EditBlog /> </PrivateRoute>} />
            <Route path="/blog/:id" element={<PrivateRoute> <ViewBlog /> </PrivateRoute>} />
            <Route path="/saved" element={<PrivateRoute> <SavedBlogs /> </PrivateRoute>} />
            <Route path="*" element={<Navigate to={token ? "/home" : "/login"} />} />
          </Routes>
        </div>
        {!isAuthPage && <Footer />}
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;