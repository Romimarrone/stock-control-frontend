import { Info, ShieldCheck, Zap, Server } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
                <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-3">
                    <Info className="w-8 h-8 text-indigo-500" /> Sobre StockControl
                </h1>
                <p className="text-slate-300 max-w-xl mx-auto text-sm leading-relaxed">
                    Sistema modular de gestión de inventario diseñado para garantizar integridad de datos y control de accesos por roles.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 text-center space-y-2">
                    <ShieldCheck className="w-10 h-10 text-indigo-400 mx-auto mb-2" />
                    <h3 className="font-bold text-white text-base">Seguridad RBAC</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">Autenticación basada en JWT con permisos diferenciados entre Usuarios y Administradores.</p>
                </div>

                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 text-center space-y-2">
                    <Zap className="w-10 h-10 text-amber-400 mx-auto mb-2" />
                    <h3 className="font-bold text-white text-base">Control en Tiempo Real</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">Actualizaciones instantáneas de existencias y trazabilidad de la fecha de último control.</p>
                </div>

                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 text-center space-y-2">
                    <Server className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                    <h3 className="font-bold text-white text-base">Arquitectura MERN</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">Frontend desacoplado en React consumiendo servicios RESTful construidos en Node.js y MongoDB.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;