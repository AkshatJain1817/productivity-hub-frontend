import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:7000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("login successful");
      navigate("/");
    } catch (err) {
      alert("login failed");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screes flex items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              className="w-full mt-1 p-3 border rounded-xl focus:ring-indigo-500"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              className="w-full mt-1 p-3 border rounded-xl focus:ring-indigo-500"
              value={password}
              placeholder="password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div>
            <button className="w-full bg-indigo-600 text-white py-3 border rounded-xl hover:bg-indigo-700 transition" type="submit">Login</button>
          </div>
          <p className="mt-2 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <span
              className="hover:underline cursor-pointer text-indigo-600"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
