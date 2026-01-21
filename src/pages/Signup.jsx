import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import validator from "validator";

const Signup = () => {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const isStrongPassword = (password) => {
    return validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser.email === formData.email) {
      setError("User already registered");
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }
    if (!isStrongPassword(formData.password)) {
      setError(
        "Password must be 8+ chars with uppercase, lowercase, number & symbol"
      );
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    localStorage.setItem("user", JSON.stringify(formData));
    toast.success("User registeration successfully")
     setLoading(true);
      setTimeout(() => {
        setLoading(false);
        nav("/login"); 
      }, 1000);
  };

  return (
    <div className="w-full max-w-sm flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-6 rounded-lg shadow-2xl w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Sign Up
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 bg-transparent border border-white/30 rounded text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-white"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 bg-transparent border border-white/30 rounded text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-white"
        />

        {/* Password */}
        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 pr-10 bg-transparent border border-white/30 rounded text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-white"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-sm text-blue-400 cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 pr-10 bg-transparent border border-white/30 rounded text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-white"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-sm text-blue-400 cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* Error */}
        {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-white/10 text-white rounded hover:bg-white/20 transition flex justify-center items-center gap-2"
          disabled={loading}
        >
          {loading ? <ClipLoader size={18} color="#fff" /> : "Signup"}
        </button>

        <p className="text-sm text-center mt-4 text-white">
          Already have an account?{" "}
          <span
            onClick={() => nav("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
