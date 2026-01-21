import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // inline error

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // clear error on typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.email !== formData.email) {
      setError("User does not exist ! Please signup to login"); // show inline error
      return;
    }

    if (user.password === formData.password) {
      setLoading(true);
      localStorage.setItem("isAuth", true);

      setTimeout(() => {
        setLoading(false);
        toast.success('Login successfully')
        nav("/"); 
      }, 1000);
    } else {
      setError("Password does not match"); // inline password error
    }
  };

  return (
    <div className="w-full max-w-sm flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 p-6 rounded-lg shadow-2xl w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Login Account
        </h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 bg-transparent border border-white/30 rounded text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-white"
          disabled={loading}
          required
        />

        {/* Password */}
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 pr-10 bg-transparent border border-white/30 rounded text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-white"
            disabled={loading}
            required
          />
          {formData.password && (
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-sm text-blue-400 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-2 bg-white/10 text-white rounded hover:bg-white/20 transition flex justify-center items-center gap-2"
          disabled={loading}
        >
          {loading ? <ClipLoader size={18} color="#fff" /> : "Login"}
        </button>

        {/* Signup Link */}
        <p className="text-sm text-center mt-4 text-white">
          Don’t have an account?{" "}
          <span
            onClick={() => nav("/signup")}
            className="text-blue-400 cursor-pointer hover:underline font-semibold"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
