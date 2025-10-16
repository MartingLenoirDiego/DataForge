import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [datasets, setDatasets] = useState<any[]>([]);
  const { logout } = useAuth();

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = async () => {
    const res = await api.get("datasets/");
    setDatasets(res.data);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ce dataset ?")) return;
    try {
      await api.delete(`datasets/${id}/`);
      setDatasets(datasets.filter((d) => d.id !== id)); // mise à jour du state
    } catch (err) {
      console.error("Erreur de suppression :", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Datasets</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <Link
        to="/upload"
        className="bg-green-500 text-white px-3 py-2 rounded mb-4 inline-block"
      >
        Upload CSV
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {datasets.map((d) => (
          <div key={d.id} className="border rounded-lg p-4 bg-white shadow">
            <h3 className="font-semibold">{d.name}</h3>
            <a
              href={d.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm"
            >
              Download
            </a>

            {d.cleaned_file && (
              <a
                href={d.cleaned_file}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-600 text-sm mt-1"
              >
                Cleaned File
              </a>
            )}

            {/* bouton supprimer */}
            <button
              onClick={() => handleDelete(d.id)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
