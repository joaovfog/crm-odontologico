import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/login/Login"
import { Register } from "../pages/register/Register"

export const GuestRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
        </Routes>
    )
}