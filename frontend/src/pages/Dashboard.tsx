import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [datasets, setDatasets] = useState<any[]>([]);
  useEffect(() => {
    api.get("datasets/").then((res) => setDatasets(res.data));
  }, []);

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
        <h1 className="text-2xl font-bold text-secondary">My Datasets</h1>
      </div>

      <Link
        to="/upload"
        className="bg-primary text-neutral px-3 py-2 rounded mb-4 inline-block"
      >
        Upload CSV
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {datasets.map((d) => (
          <div key={d.id} className="border-4 border-info/40 rounded-lg p-4 bg-neutral shadow">
            <h3 className="font-bold text-secondary">{d.name}</h3>
            <Link
              to={`/datasets/${d.id}/preview`}
              className="block text-primary text-sm mt-2 hover:underline"
            >
              Preview
            </Link>
            <button className="mt-3 bg-primary text-white px-3 py-1 rounded hover:bg-red-600 mr-1">
              Download
            </button>
            <button
              onClick={() => handleDelete(d.id)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
