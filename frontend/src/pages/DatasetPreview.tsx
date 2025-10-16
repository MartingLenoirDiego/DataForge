import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

export default function DatasetPreview() {
  const { id } = useParams();
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const res = await api.get(`datasets/${id}/preview/`);
        setColumns(res.data.columns);
        setRows(res.data.rows);
      } catch (err: any) {
        setError(err.response?.data?.error || "Erreur lors du chargement du CSV");
      } finally {
        setLoading(false);
      }
    };
    fetchPreview();
  }, [id]);

  if (loading) {
    return <div className="text-center p-8 text-gray-600">Chargement...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        ⚠️ {error}
        <div className="mt-4">
          <Link to="/" className="text-blue-600 underline">
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Aperçu du CSV #{id}</h1>
        <Link to="/" className="text-blue-600 underline">
          ← Retour
        </Link>
      </div>

      <div className="overflow-auto border rounded-lg shadow bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col} className="text-left px-4 py-2 border-b font-semibold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2 border-b">
                    {String(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}