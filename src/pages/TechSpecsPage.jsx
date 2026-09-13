import { Cpu, Database, Shield, Layout } from 'lucide-react';

const TechSpecsPage = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b border-slate-800 pb-4">
                <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                    <Cpu className="w-8 h-8 text-indigo-500" /> Especificaciones Técnicas
                </h1>
                <p className="text-slate-400 text-sm mt-1">Detalle de la arquitectura y componentes del sistema MERN.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-white text-base">
                        <Layout className="w-5 h-5 text-indigo-400" /> Frontend
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5">
                        <li>React JS con bundling vía Vite</li>
                        <li>Enrutamiento cliente con React Router Dom v7</li>
                        <li>Gestión de estado global mediante Context API</li>
                        <li>Cliente HTTP Axios con interceptores de JWT</li>
                        <li>Alertas interactivas con SweetAlert2</li>
                    </ul>
                </div>

                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-white text-base">
                        <Database className="w-5 h-5 text-emerald-400" /> Backend
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5">
                        <li>Node.js + Express Framework</li>
                        <li>Base de datos MongoDB gestionada mediante Mongoose</li>
                        <li>Validaciones de esquemas y tipos de datos</li>
                        <li>Scaffolded Seed Script para inicialización de Admin</li>
                    </ul>
                </div>

                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3 md:col-span-2">
                    <div className="flex items-center gap-2 font-bold text-white text-base">
                        <Shield className="w-5 h-5 text-amber-400" /> Capa de Seguridad
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5">
                        <li>Encriptación de contraseñas con bcryptjs</li>
                        <li>Tokens JWT firmados con expiración fija</li>
                        <li>Middlewares de protección de rutas y control de roles (Admin/User)</li>
                        <li>Manejo de estados de cuenta activa / suspendida</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TechSpecsPage;