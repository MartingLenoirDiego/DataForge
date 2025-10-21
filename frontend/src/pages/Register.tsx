import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     try {
        await register(username, password);
        window.location.href = "/login";
    } catch {
        setError("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-80">
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="border p-2 w-full mb-2 rounded"
        />
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="border p-2 w-full mb-4 rounded"
        />
        <button type="submit"
                className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >Register</button>
        </form>
    </div>
  );
};

export default Register;
