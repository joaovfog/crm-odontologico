import { Link, Navigate, Route, Routes } from "react-router-dom"

import Layout from "../layout/Layout"
import { Dashboard } from "../pages/dashboard/Dashboard";
import { PatientsDetails } from "../pages/patients/PatientsDetails";
import { PatientsList } from "../pages/patients/PatientsList"
import { Schedule } from "../pages/schedule/Schedule";
import { AppointmentsDetails } from "../pages/schedule/AppointmentsDetails";
import { EditPatientModal } from "../pages/patients/EditPatientModal";
import { RequireAuth } from "react-auth-kit";
import { Login } from "../pages/login/Login";

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
    <Layout>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <RequireAuth loginPath="/login">
              <Dashboard />
            </RequireAuth>}
        />
        <Route
          path="/patients"
          element={
            <RequireAuth loginPath="/login">
              <PatientsList />
            </RequireAuth>}
        />
        <Route
          path="/patients/:id/details"
          element={
            <RequireAuth loginPath="/login">
              <PatientsDetails />
            </RequireAuth>}
        />
        <Route
          path="/consults"
          element={
            <RequireAuth loginPath="/login">
              <Schedule />
            </RequireAuth>}
        />
        <Route
          path="/consults/:id/details"
          element={
            <RequireAuth loginPath="/login">
              <AppointmentsDetails />
            </RequireAuth>}
        />
        <Route
          path=""
          element={
            <RequireAuth loginPath="/login">
              <Schedule />
            </RequireAuth>}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  )
}