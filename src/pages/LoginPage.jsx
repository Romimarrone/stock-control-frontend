import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Petición al backend Express/Node
            const user = await login(email, password);

            Swal.fire({
                icon: 'success',
                title: `¡Bienvenido, ${user.name || user.email}!`,
                timer: 1500,
                showConfirmButton: false,
            });

            // Redirección al catálogo/inicio
            navigate('/');
        } catch (error) {
            alert(error);
            Swal.fire({
                icon: 'error',
                title: 'Error de autenticación',
                text: error.response?.data?.message || 'Credenciales inválidas',
            });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="bg-slate-800/90 p-8 rounded-2xl border border-slate-700 shadow-2xl space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-white">Iniciar Sesión</h2>
                    <p className="text-slate-400 text-xs">Ingresá tus credenciales para acceder al sistema</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Correo Electrónico */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Correo Electrónico
                        </label>
                        <div className="relative">
                            <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ejemplo@correo.com"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Contraseña
                        </label>
                        <div className="relative">
                            <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••••••"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all tracking-wider"
                                required
                            />
                        </div>
                    </div>

                    {/* Botón de Enviar */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 text-sm mt-2 cursor-pointer"
                    >
                        <LogIn className="w-4 h-4" /> Iniciar Sesión
                    </button>
                </form>

                <p className="text-center text-xs text-slate-400">
                    ¿No tenés una cuenta?{' '}
                    <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-2">
                        Registrate acá
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;