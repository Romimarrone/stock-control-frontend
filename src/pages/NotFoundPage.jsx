import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="text-center py-20 max-w-md mx-auto">
            <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h1 className="text-4xl font-extrabold text-slate-800 mb-2">404</h1>
            <h2 className="text-xl font-bold text-slate-700 mb-4">Página no encontrada</h2>
            <p className="text-slate-500 text-sm mb-6">
                La dirección que intentás consultar no existe o no tenés permisos para visualizarla.
            </p>
            <Link
                to="/"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
                <Home className="w-4 h-4" /> Volver al Inicio
            </Link>
        </div>
    );
};

export default NotFoundPage;