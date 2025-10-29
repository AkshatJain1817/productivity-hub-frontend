import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/api/auth/signup", {
        name,
        email,
        password,
      });
      alert("signup successful");
      navigate("/login");
    } catch (error) {
      alert("signup failed");
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account ✨
        </h2>
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
              type="text"
              value={name}
              placeholder="Your full name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
              placeholder="••••••••"
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
            type="submit"
          >
            Sign Up
          </button>

          <p className="mt-3 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              className="text-indigo-600 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
