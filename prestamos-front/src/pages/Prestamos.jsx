import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Swal from "sweetalert2";

function Prestamos() {

    const navigate = useNavigate();

    const [prestamos, setPrestamos] = useState([]);

    const [monto, setMonto] = useState("");

    const [plazoMeses, setPlazoMeses] = useState("");

    useEffect(() => {

        cargarPrestamos();

    }, []);

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    const cargarPrestamos = async () => {

        try {

            const response =
                await api.get(
                    "/api/prestamos"
                );

            setPrestamos(
                response.data
            );

        } catch (error) {

            console.log(error);

        }
    };

    const solicitarPrestamo = async () => {

        try {

            await api.post(
                "/api/prestamos",
                {
                    monto,
                    plazoMeses
                }
            );

            Swal.fire({
                icon: "success",
                title: "Solicitud enviada"
            });

            setMonto("");
            setPlazoMeses("");

            cargarPrestamos();

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No fue posible crear el préstamo"
            });

        }
    };

    return (

        <div className="container mt-5">

            <div className="d-flex justify-content-between mb-4">

                <h1>Mis Préstamos</h1>

                <button
                    className="btn btn-warning"
                    onClick={logout}
                >
                    Cerrar sesión
                </button>

            </div>

            <div className="card p-4 shadow mb-4">

                <h4>Solicitar préstamo</h4>

                <div className="mb-3">

                    <label>Monto</label>

                    <input
                        type="number"
                        className="form-control"
                        value={monto}
                        onChange={(e) =>
                            setMonto(e.target.value)
                        }
                    />

                </div>

                <div className="mb-3">

                    <label>Plazo (meses)</label>

                    <input
                        type="number"
                        className="form-control"
                        value={plazoMeses}
                        onChange={(e) =>
                            setPlazoMeses(e.target.value)
                        }
                    />

                </div>

                <button
                    className="btn btn-primary"
                    onClick={solicitarPrestamo}
                >
                    Solicitar
                </button>

            </div>

            <table className="table table-dark table-striped">

                <thead>

                <tr>
                    <th>ID</th>
                    <th>Monto</th>
                    <th>Estado</th>
                </tr>

                </thead>

                <tbody>

                {
                    prestamos.map(p => (

                        <tr key={p.id}>

                            <td>{p.id}</td>

                            <td>
                                ${p.monto}
                            </td>

                            <td>
                                {p.estado}
                            </td>

                        </tr>

                    ))
                }

                </tbody>

            </table>

        </div>
    );
}

export default Prestamos;