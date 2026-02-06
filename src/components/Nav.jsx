/**
 * Functional component representing the main navigation bar.
 * Contains links to Home, Buildings, and Admin pages, and responsive hamburger menu.
 *
 * @component
 */
import { Link } from 'react-router-dom';
import Hamburguesa from './Menu.jsx';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Navegation() {
    const { userLogged, logout } = useContext(UserContext);
    return (
        // Fixed header at the top with primary background color
        <header
            className="w-full p-4 sticky top-0 z-50"
            style={{ backgroundColor: 'var(--color-primary)' }}
        >
            <nav className="nav-container">

                {/* Logo and Title - LEFT */}
                <Link to="/" className="nav-logo-group group">
                    <img src="/res/logoInvertido.png" alt="BrickBravio Logo" style={{ height: '3.5rem', width: 'auto', display: 'block' }} />
                    <span className="nav-brand-title">
                        BrickBravio
                    </span>
                </Link>

                {/* Buttons - RIGHT */}
                <div className="desktop-only">
                    {/* Link to Home page */}
                    <Link
                        to="/inicio"
                        className="nav-link"
                    >
                        Home
                    </Link>

                    {/* Link to Buildings page */}
                    <Link
                        to="/edificios"
                        className="nav-link"
                    >
                        Buildings
                    </Link>

                    {/* Link to Admin page */}
                    <Link
                        to="/admin"
                        className="nav-link"
                    >
                        Admin
                    </Link>
                </div>

                {/* Hamburger menu component for mobile navigation */}
                <div className="mobile-only text-secondary">
                    <Hamburguesa />
                </div>

                <div className="flex items-center">
                    {!userLogged ? (
                        <Link
                            to="/login"
                            className="nav-link bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors"
                        >
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={logout}
                            className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navegation;
