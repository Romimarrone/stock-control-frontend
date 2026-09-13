import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { Package, RefreshCw, Filter, Layers, Calendar, Edit3, Plus, ChevronDown, Check } from 'lucide-react';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);
    const { isAdmin } = useAuth();

    // Hook para cerrar el dropdown si el usuario hace clic fuera del componente
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchProducts = async (category = '') => {
        setLoading(true);
        try {
            const url = category ? `/products?category=${encodeURIComponent(category)}` : '/products';
            const { data } = await api.get(url);
            setProducts(data.data);

            if (!category && categories.length === 0) {
                const uniqueCats = [...new Set(data.data.map((p) => p.category))];
                setCategories(uniqueCats);
            }
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron obtener los productos.' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(selectedCategory);
    }, [selectedCategory]);

    const handleUpdateStock = async (product) => {
        const { value: newStock } = await Swal.fire({
            title: `Ajustar Stock`,
            text: product.name,
            input: 'number',
            inputValue: product.stock,
            showCancelButton: true,
            confirmButtonColor: '#6366f1',
            inputValidator: (val) => (!val || val < 0 ? 'Ingrese una cantidad válida' : null),
        });

        if (newStock !== undefined) {
            try {
                await api.patch(`/products/${product._id}/stock`, { stock: parseInt(newStock, 10) });
                Swal.fire({ icon: 'success', title: 'Stock actualizado', timer: 1200, showConfirmButton: false });
                fetchProducts(selectedCategory);
            } catch (error) {
                Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo modificar el stock.' });
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Header Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
                        <Package className="w-8 h-8 text-indigo-500" /> Catálogo de Inventario
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">Consulta disponibilidad y existencias en tiempo real.</p>
                </div>

                {/* Acciones y Filtro */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Botón exclusivo para Administrador */}
                    {isAdmin && (
                        <Link
                            to="/products/new"
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20"
                        >
                            <Plus className="w-4 h-4" /> Agregar Producto
                        </Link>
                    )}

                    {/* Custom Filter Dropdown */}
                    <div className="relative inline-block text-left" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700/80 text-slate-200 px-4 py-2.5 rounded-xl border border-slate-700 text-sm font-medium transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                        >
                            <Filter className="w-4 h-4 text-indigo-400" />
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Categoría:
                            </span>
                            <span className="text-white font-semibold">
                                {selectedCategory || 'Todas'}
                            </span>
                            <ChevronDown
                                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-indigo-400' : ''
                                    }`}
                            />
                        </button>

                        {/* Menú Flotante */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-52 bg-slate-800 border border-slate-700/80 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                <button
                                    onClick={() => {
                                        setSelectedCategory('');
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-indigo-600/20 hover:text-indigo-300 transition-colors cursor-pointer ${selectedCategory === ''
                                            ? 'text-indigo-400 font-semibold bg-indigo-500/10'
                                            : 'text-slate-300'
                                        }`}
                                >
                                    Todas
                                    {selectedCategory === '' && <Check className="w-4 h-4 text-indigo-400" />}
                                </button>

                                {categories.length > 0 && <div className="my-1 border-t border-slate-700/50" />}

                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-indigo-600/20 hover:text-indigo-300 transition-colors cursor-pointer ${selectedCategory === cat
                                                ? 'text-indigo-400 font-semibold bg-indigo-500/10'
                                                : 'text-slate-300'
                                            }`}
                                    >
                                        {cat}
                                        {selectedCategory === cat && <Check className="w-4 h-4 text-indigo-400" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Grid Status */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-16 bg-slate-800/30 rounded-2xl border border-slate-800">
                    <Layers className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                    <p className="text-slate-400">No hay productos registrados en esta categoría.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((p) => (
                        <div
                            key={p._id}
                            className="bg-slate-800/60 hover:bg-slate-800 rounded-xl border border-slate-700/60 p-5 flex flex-col justify-between transition-all hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                                        {p.category}
                                    </span>
                                    <span
                                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.stock > 5
                                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                            }`}
                                    >
                                        Stock: {p.stock}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{p.description}</p>
                            </div>

                            <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-500">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                    {p.lastStockControl ? new Date(p.lastStockControl).toLocaleDateString() : 'N/A'}
                                </span>

                                {isAdmin && (
                                    <button
                                        onClick={() => handleUpdateStock(p)}
                                        className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg transition-colors border border-indigo-500/30 cursor-pointer"
                                    >
                                        <Edit3 className="w-3.5 h-3.5" /> Ajustar
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;