import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authApi.post("/login", { email, password });
      if (!response.data.token || !response.data.user) {
        throw new Error("Invalid token or user data in response");
      }
      localStorage.setItem("token", response.data.token);
      login(response.data.user, response.data.token);
      toast.success("Login successful!");
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Rectangle Card */}
      <div className="w-full max-w-5xl h-[440px] flex shadow-xl overflow-hidden bg-white">
        {/* Left Side */}
        <div className="w-1/2 bg-gray-900 text-white gap-1 flex flex-col justify-center items-center p-6">
          <h1 className="text-4xl font-bold mb-2">Blogify</h1>
          <p className="text-xl font-medium mb-2">Login to your account</p>
          <p className="text-sm text-gray-300">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
          <p className="text-xs text-gray-500 mt-10">
            © {new Date().getFullYear()} Blogify.com, All rights reserved
          </p>
        </div>

        {/* Right Side Form */}
        <div className="w-1/2 flex items-center justify-center p-10">
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              Welcome Back 👋
            </h2>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div>
              <label className="block font-semibold text-sm text-gray-700 mb-1 text-left">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-sm text-gray-700 mb-1 text-left">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-xs text-gray-500 text-center mt-2">
              By continuing, you agree to Blogify's{" "}
              <Link to="#" className="underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link to="#" className="underline">
                Privacy Policy
              </Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

