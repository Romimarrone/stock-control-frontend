import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // O la ubicación de tu AuthContext
import { Boxes, LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-slate-950 border-b border-slate-800 text-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 font-bold text-lg text-indigo-400 hover:text-indigo-300 transition-colors">
                        <Boxes className="w-6 h-6" />
                        <span>StockControl</span>
                    </Link>

                    {/* Enlaces de navegación */}
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
                        <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
                        <Link to="/about" className="hover:text-white transition-colors">Nosotros</Link>
                        <Link to="/contact" className="hover:text-white transition-colors">Contacto</Link>
                        <Link to="/tech-specs" className="hover:text-white transition-colors">Especificaciones</Link>
                    </div>

                    {/* Renderizado condicional según estado de autenticación */}
                    <div className="flex items-center gap-3 text-sm">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                                    <User className="w-4 h-4 text-indigo-400" />
                                    <span className="font-medium text-xs">{user.name || user.email}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg font-medium transition-colors border border-slate-700 text-xs"
                                >
                                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                                    Salir
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-white text-slate-300 font-medium px-3 py-2 transition-colors">
                                    Ingresar
                                </Link>
                                <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm">
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;