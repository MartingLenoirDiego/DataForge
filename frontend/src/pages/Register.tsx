import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      window.location.href = "/login";
    } catch {
      setError("Erreur : identifiants invalides");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark text-white px-4">
      {/* Logo / Titre */}
      <h1 className="text-5xl font-extrabold mb-8 text-secondary tracking-wide">
        DATAFORGE
      </h1>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="bg-neutral/90 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-sm border border-info/30"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-secondary">
          Créer un compte
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center bg-red-900/30 py-2 rounded">
            {error}
          </p>
        )}

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nom d'utilisateur"
          required
          className="border border-info/40 bg-dark/30 focus:border-info focus:ring-2 focus:ring-info/40 outline-none text-white placeholder-gray-400 p-3 w-full mb-4 rounded-lg transition"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
          className="border border-info/40 bg-dark/30 focus:border-info focus:ring-2 focus:ring-info/40 outline-none text-white placeholder-gray-400 p-3 w-full mb-6 rounded-lg transition"
        />

        <button
          type="submit"
          className="bg-primary hover:bg-secondary text-neutral font-semibold w-full py-3 rounded-lg transition-colors duration-200"
        >
          S'inscrire
        </button>
      </form>

      <Link
        to="/login"
        className="text-info text-sm mt-6 hover:underline transition"
      >
        Déjà un compte ? Connecte-toi
      </Link>
    </div>
  );
};

export default Register;
