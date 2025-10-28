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
        setError(err.response?.data?.error || "Error loading CSV");
      } finally {
        setLoading(false);
      }
    };
    fetchPreview();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center p-8 text-info">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-400 bg-red-900/20 rounded-lg max-w-md mx-auto">
        ⚠️ {error}
        <div className="mt-4">
          <Link
            to="/"
            className="inline-block bg-info hover:bg-secondary text-neutral font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            ← Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-dark min-h-screen">
      {/* En-tête avec retour */}
      <div className="flex justify-between items-center mb-6 mx-auto">
        <h1 className="text-2xl font-bold text-secondary">
          Preview of CSV #{id}
        </h1>
        <Link
          to="/"
          className="inline-block bg-info hover:bg-secondary text-neutral font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
        >
          ← Retour
        </Link>
      </div>

      {/* Table dans un panneau clair */}
      <div className="overflow-auto bg-neutral/90 backdrop-blur-md border border-info/30 rounded-2xl shadow-lg w-full px-2 sm:px-4">
        <table className="min-w-full text-sm text-white">
          <thead className="bg-info/20">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="text-left px-4 py-2 border-b border-info/30 font-semibold"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-neutral/30 transition-colors duration-150"
              >
                {columns.map((col) => (
                  <td
                    key={col}
                    className="px-4 py-2 border-b border-info/20"
                  >
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
