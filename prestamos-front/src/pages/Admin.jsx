import { useEffect, useState } from "react";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Admin() {

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        navigate("/");
    };

    const navigate = useNavigate();

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            navigate("/");
            return;
        }

        const payload =
            jwtDecode(token);

        if (payload.rol !== "ADMIN") {

            navigate("/prestamos");
            return;
        }

        cargar();

    }, []);

    const [prestamos, setPrestamos] =
        useState([]);

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {

        const response =
            await api.get(
                "/api/prestamos"
            );

        setPrestamos(
            response.data
        );
    };

    const aprobar = async (id) => {

        await api.put(
            `/api/prestamos/${id}/aprobar`
        );

        Swal.fire({
            icon: "success",
            title: "Préstamo aprobado"
        });

        cargar();
    };

    const rechazar = async (id) => {

        await api.put(
            `/api/prestamos/${id}/rechazar`
        );

        Swal.fire({
            icon: "success",
            title: "Préstamo rechazado"
        });

        cargar();
    };

    return (

        <div className="container py-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h1 className="fw-bold mb-0">
                        Panel Administrador
                    </h1>

                    <small className="text-muted">
                        Gestión de préstamos bancarios
                    </small>
                </div>

                <button
                    className="btn btn-warning"
                    onClick={logout}
                >
                    Cerrar sesión
                </button>

            </div>

            <div className="card shadow border-0">

                <div className="card-header bg-dark text-white">

                    <h5 className="mb-0">
                        Solicitudes de Préstamo
                    </h5>

                </div>

                <div className="card-body p-0">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-dark">

                            <tr>
                                <th>ID</th>
                                <th>Monto</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>

                        </thead>

                        <tbody>

                            {
                                prestamos.map(p => (

                                    <tr key={p.id}>

                                        <td>
                                            <strong>
                                                #{p.id}
                                            </strong>
                                        </td>

                                        <td>
                                            $
                                            {Number(p.monto)
                                                .toLocaleString()}
                                        </td>

                                        <td>

                                            {
                                                p.estado === "APROBADO" &&
                                                <span className="badge bg-success">
                                                    APROBADO
                                                </span>
                                            }

                                            {
                                                p.estado === "RECHAZADO" &&
                                                <span className="badge bg-danger">
                                                    RECHAZADO
                                                </span>
                                            }

                                            {
                                                p.estado === "PENDIENTE" &&
                                                <span className="badge bg-warning text-dark">
                                                    PENDIENTE
                                                </span>
                                            }

                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() => aprobar(p.id)}
                                            >
                                                Aprobar
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => rechazar(p.id)}
                                            >
                                                Rechazar
                                            </button>

                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );
}

export default Admin;