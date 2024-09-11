import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./Layouts/Admin/AdminRoutes";
import ClientRoutes from "./Layouts/Client/ClientRoutes";
import CompanyRoutes from "./Layouts/Company/CompanyRoutes";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/admin/*" element={<AdminRoutes />} />
          <Route exact path="/company/*" element={<CompanyRoutes />} />
          <Route exact path="/*" element={<ClientRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
