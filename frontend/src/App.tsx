import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadCSV from "./pages/UploadCSV";
import DatasetPreview from "./pages/DatasetPreview";


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<PrivateRoute><UploadCSV /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/datasets/:id/preview" element={<DatasetPreview />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
