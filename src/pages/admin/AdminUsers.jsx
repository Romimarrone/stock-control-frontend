import { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import Swal from 'sweetalert2';
import { Users, Shield, UserX, UserCheck, Trash2, RefreshCw } from 'lucide-react';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Obtener lista completa de usuarios desde la API
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/users');
            setUsers(data.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error de carga',
                text: 'No se pudo obtener la lista de usuarios.',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Alternar estado (Activo / Suspendido)
    const handleToggleStatus = async (user) => {
        const actionText = user.isActive ? 'suspender' : 'activar';
        const result = await Swal.fire({
            title: `¿Desea ${actionText} al usuario?`,
            text: `Usuario: ${user.name} (${user.email})`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: user.isActive ? '#e11d48' : '#16a34a',
            cancelButtonColor: '#64748b',
            confirmButtonText: `Sí, ${actionText}`,
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await api.patch(`/users/${user._id}/status`);
                Swal.fire({
                    icon: 'success',
                    title: `Usuario ${user.isActive ? 'suspendido' : 'activado'}`,
                    timer: 1500,
                    showConfirmButton: false,
                });
                fetchUsers();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response?.data?.message || 'No se pudo cambiar el estado del usuario.',
                });
            }
        }
    };

    // Eliminar Usuario
    const handleDeleteUser = async (user) => {
        const result = await Swal.fire({
            title: '¿Eliminar usuario permanentemente?',
            text: `Esta acción no se puede deshacer para el usuario "${user.name}".`,
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/users/${user._id}`);
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario eliminado',
                    timer: 1500,
                    showConfirmButton: false,
                });
                fetchUsers();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response?.data?.message || 'No se pudo eliminar el usuario.',
                });
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Encabezado */}
            <div className="border-b border-slate-200 pb-5">
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                    <Users className="w-8 h-8 text-indigo-600" /> Control de Usuarios
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    Administrá los permisos, estados de acceso y suspensiones de las cuentas.
                </p>
            </div>

            {/* Tabla de Usuarios */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Usuario</th>
                                    <th className="px-6 py-4">Correo Electrónico</th>
                                    <th className="px-6 py-4">Rol</th>
                                    <th className="px-6 py-4">Estado</th>
                                    <th className="px-6 py-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-slate-400">
                                            No hay usuarios registrados en el sistema.
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((u) => (
                                        <tr key={u._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-800">{u.name}</td>
                                            <td className="px-6 py-4 text-slate-600">{u.email}</td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${u.role === 'admin'
                                                            ? 'bg-amber-100 text-amber-800'
                                                            : 'bg-slate-100 text-slate-700'
                                                        }`}
                                                >
                                                    {u.role === 'admin' && <Shield className="w-3 h-3" />}
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${u.isActive
                                                            ? 'bg-emerald-100 text-emerald-700'
                                                            : 'bg-rose-100 text-rose-700'
                                                        }`}
                                                >
                                                    {u.isActive ? 'Activo' : 'Suspendido'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                {/* Botón Suspender / Activar */}
                                                <button
                                                    onClick={() => handleToggleStatus(u)}
                                                    className={`p-1.5 rounded-md transition-colors ${u.isActive
                                                            ? 'text-rose-600 hover:bg-rose-50'
                                                            : 'text-emerald-600 hover:bg-emerald-50'
                                                        }`}
                                                    title={u.isActive ? 'Suspender usuario' : 'Activar usuario'}
                                                >
                                                    {u.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                                                </button>

                                                {/* Botón Eliminar */}
                                                <button
                                                    onClick={() => handleDeleteUser(u)}
                                                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                                                    title="Eliminar registro"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;