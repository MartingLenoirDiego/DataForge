import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function UploadCSV() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name) {
      setError("Veuillez renseigner un nom et choisir un fichier");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);

    try {
      await api.post("datasets/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'upload");
    }
  };

  return (
    <div className="p-6 bg-dark min-h-screen">
      <div className="max-w-md mx-auto bg-neutral/90 backdrop-blur-md border border-info/30 rounded-2xl shadow-lg p-6">
        {/* Bouton retour */}
        <Link
          to="/"
          className="inline-block mb-4 bg-info hover:bg-secondary text-neutral font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
        >
          ← Retour
        </Link>

        <h1 className="text-2xl font-bold mb-4 text-secondary text-center">
          Upload CSV
        </h1>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center bg-red-900/30 py-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Dataset name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-info/40 bg-dark/30 focus:border-info focus:ring-2 focus:ring-info/40 text-white placeholder-gray-400 p-3 rounded-lg outline-none transition"
          />
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="border border-info/40 bg-dark/30 focus:border-info focus:ring-2 focus:ring-info/40 text-white placeholder-gray-400 p-3 rounded-lg outline-none transition"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-neutral font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
