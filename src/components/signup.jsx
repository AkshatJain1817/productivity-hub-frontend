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
    <div className="min-h-screes flex items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name:</label>
            <input
              className="w-full mt-1 p-3 border rounded-xl focus:ring-indigo-500"
              type="Name"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              className="w-full mt-1 p-3 border rounded-xl focus:ring-indigo-500"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              className="w-full mt-1 p-3 border rounded-xl focus:ring-indigo-500"
              placeholder="password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div>
            <button className="w-full bg-indigo-600 text-white py-3 border rounded-xl hover:bg-indigo-700 transition" type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
