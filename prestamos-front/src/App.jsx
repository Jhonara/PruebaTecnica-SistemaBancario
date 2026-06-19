import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Prestamos from "./pages/Prestamos";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/admin"
                    element={<Admin />}
                />

                <Route
                    path="/prestamos"
                    element={<Prestamos />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;