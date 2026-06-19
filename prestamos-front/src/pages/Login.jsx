import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";
import Swal from "sweetalert2";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

        try {

            const response = await api.post(
                "/auth/login",
                {
                    username,
                    password
                }
            );

            const token = response.data.token;

            localStorage.setItem(
                "token",
                token
            );

            const payload =
                jwtDecode(token);

            await Swal.fire({
                icon: "success",
                title: "Bienvenido",
                text: `Ingreso exitoso`,
                timer: 1500,
                showConfirmButton: false
            });

            if (payload.rol === "ADMIN") {

                navigate("/admin");

            } else {

                navigate("/prestamos");

            }

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Usuario o contraseña incorrectos"
            });

        }
    };

    return (

        <div
            className="d-flex justify-content-center align-items-center vh-100 bg-light"
        >

            <div
                className="card shadow p-4"
                style={{ width: "400px" }}
            >

                <h2
                    className="text-center mb-4"
                >
                    Sistema de Préstamos
                </h2>

                <div className="mb-3">

                    <label
                        className="form-label"
                    >
                        Correo
                    </label>

                    <input
                        type="email"
                        className="form-control"
                        placeholder="correo@ejemplo.com"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />

                </div>

                <div className="mb-3">

                    <label
                        className="form-label"
                    >
                        Contraseña
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        placeholder="********"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                </div>

                <button
                    className="btn btn-primary w-100"
                    onClick={login}
                >
                    Ingresar
                </button>

            </div>

        </div>

    );
}

export default Login;