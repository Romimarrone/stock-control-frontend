import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { UserPlus, User, Mail, Lock } from 'lucide-react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formData;

        if (!name || !email || !password) {
            Swal.fire({ icon: 'warning', title: 'Atención', text: 'Todos los campos son obligatorios.', confirmColor: '#4f46e5' });
            return;
        }

        if (password.length < 6) {
            Swal.fire({ icon: 'warning', title: 'Contraseña débil', text: 'La contraseña debe tener al menos 6 caracteres.', confirmColor: '#4f46e5' });
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Las contraseñas no coinciden.', confirmColor: '#4f46e5' });
            return;
        }

        setLoading(true);
        try {
            await register(name, email, password);
            Swal.fire({
                icon: 'success',
                title: '¡Cuenta creada!',
                text: 'Registro completado con éxito',
                timer: 1500,
                showConfirmButton: false,
            });
            navigate('/');
        } catch (error) {
            const message = error.response?.data?.message || 'Error al registrar el usuario';
            Swal.fire({ icon: 'error', title: 'Error en el registro', text: message, confirmColor: '#4f46e5' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="bg-slate-800/90 p-8 rounded-2xl border border-slate-700 shadow-2xl space-y-6">
                <div className="text-center space-y-2">
                    <UserPlus className="w-10 h-10 mx-auto text-indigo-400 mb-1" />
                    <h2 className="text-2xl font-bold text-white">Crear Cuenta</h2>
                    <p className="text-slate-400 text-xs">Formá parte de la plataforma</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nombre Completo */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Nombre Completo
                        </label>
                        <div className="relative">
                            <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Juan Pérez"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Correo Electrónico */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Correo Electrónico
                        </label>
                        <div className="relative">
                            <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="correo@ejemplo.com"
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
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Mínimo 6 caracteres"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all tracking-wider"
                                required
                            />
                        </div>
                    </div>

                    {/* Confirmar Contraseña */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Confirmar Contraseña
                        </label>
                        <div className="relative">
                            <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Repetí tu contraseña"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all tracking-wider"
                                required
                            />
                        </div>
                    </div>

                    {/* Botón de Registro */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 text-sm mt-2 cursor-pointer disabled:opacity-50"
                    >
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <p className="text-center text-xs text-slate-400">
                    ¿Ya tenés una cuenta?{' '}
                    <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-2">
                        Iniciá sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;