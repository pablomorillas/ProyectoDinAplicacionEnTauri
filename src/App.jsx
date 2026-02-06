// Componente principal de la aplicación
// Define la estructura general: navegación, rutas y footer
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import Content from './components/Content'
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from './components/Nav'
import Section from './components/Section'
import BuildingPage from './pages/BuildingPage'
import DetalleEdificios from './components/DetalleEdificios.jsx'
import Footer from './components/Footer.jsx'
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import Login from "./pages/Login";

function App() {
  const PrivateRoute = ({ children }) => {
    const { userLogged } = useContext(UserContext);
    if (!userLogged) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <>
      {/* Barra de navegación principal */}
      <Nav />

      {/* Configuración de rutas */}
      <Routes>
        {/* Layout principal que renderiza las rutas hijas dentro de Content */}
        <Route path="/" element={<Content />}>
          <Route index element={<HomePage />} />              {/* Página de inicio */}
          <Route path="inicio" element={<HomePage />} />     {/* Alias de inicio */}
          <Route path="edificios" element={<BuildingPage />} />  {/* Listado de edificios */}
          <Route path="edificios/:id" element={<DetalleEdificios />} /> {/* Detalle de edificio */}
          <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />     {/* Panel de administración */}
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Ruta 404 para páginas no encontradas */}
        <Route path="*" element={
          <Section>
            <h1 className='contenedor_h1'>Página no encontrada</h1>
          </Section>
        } />
      </Routes>

      {/* Pie de página visible en todas las páginas */}
      <Footer />
    </>
  )
}

export default App;
