import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar.jsx';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Outlet />
            </main>
            <footer className="bg-slate-950 border-t border-slate-800 text-center py-6 text-xs text-slate-500">
                © 2026 StockControl System. Todos los derechos reservados.
            </footer>
        </div>
    );
};

export default MainLayout;