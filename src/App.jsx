import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout
import MainLayout from './layouts/MainLayout';

// Componentes de Protección
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';

// Páginas Públicas
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TechSpecsPage from './pages/TechSpecsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Páginas de Administración
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import AddProductPage from './pages/AddProductPage'; // <-- Importar el nuevo componente

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Layout Principal para la estructura visual común */}
                    <Route path="/" element={<MainLayout />}>

                        {/* Rutas Públicas */}
                        <Route index element={<HomePage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="contact" element={<ContactPage />} />
                        <Route path="tech-specs" element={<TechSpecsPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />

                        {/* Rutas Protegidas para Usuarios Autenticados */}
                        <Route element={<ProtectedRoute />}>
                            {/* Espacio reservado para vistas exclusivas de usuarios autenticados si aplica */}
                        </Route>

                        {/* Rutas Protegidas Exclusivas para Administradores */}
                        <Route element={<AdminRoute />}>
                            <Route path="products/new" element={<AddProductPage />} /> {/* <-- Agregar aquí */}
                            <Route path="admin/products" element={<AdminProducts />} />
                            <Route path="admin/users" element={<AdminUsers />} />
                        </Route>

                        {/* Ruta 404 para URLs inexistentes */}
                        <Route path="*" element={<NotFoundPage />} />

                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;