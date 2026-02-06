import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const { userLogged, login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        login();
        navigate("/admin");
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <img src="/res/logoInvertido.png" alt="BrickBravio Logo" className="login-logo" />

                {userLogged ? (
                    <div className="logged-container">
                        <h2 className="contenedor_h2">¡Bienvenido de nuevo!</h2>
                        <p className="contenedor_p" style={{ color: 'white' }}>Ya has iniciado sesión en el sistema.</p>
                        <Link to="/admin" className="admin-access-btn">
                            Ir al Panel de Control
                        </Link>
                    </div>
                ) : (
                    <>
                        <h2>BrickBravio</h2>
                        <p>Plataforma de Gestión Inmobiliaria</p>
                        <button
                            onClick={handleLogin}
                            className="login-button"
                        >
                            Acceder al Sistema
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Login;