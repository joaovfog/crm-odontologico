import { Link, Route, Routes } from "react-router-dom"

import Layout from "../layout/Layout"
import { Dashboard } from "../pages/dashboard/Dashboard";
import { PatientsList } from "../pages/patients/PatientsList"
import { Schedule } from "../pages/schedule/Schedule";

function NoMatch() {
    return (
      <div>
        <h2>Nada para ver aqui!</h2>
        <p>
          <Link to="/">Vá para a página inicial</Link>
        </p>
      </div>
    );
  }

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PatientsList />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="patients" element={<PatientsList />} />
                <Route path="schedule" element={<Schedule />} />
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    )
}