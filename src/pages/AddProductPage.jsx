import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { PackagePlus, ArrowLeft } from 'lucide-react';
import api from '../api/axiosConfig';

const AddProductPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        stock: 0,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/products', formData);

            Swal.fire({
                icon: 'success',
                title: 'Producto creado',
                text: 'El producto se agregó correctamente al inventario',
                timer: 1500,
                showConfirmButton: false,
            });

            navigate('/');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al crear',
                text: error.response?.data?.message || 'No se pudo guardar el producto',
            });
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-8">
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-4 transition-all cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4" /> Volver al catálogo
            </button>

            <div className="bg-slate-800/90 p-8 rounded-2xl border border-slate-700 shadow-2xl space-y-6">
                <div className="text-center space-y-1">
                    <h2 className="text-2xl font-bold text-white">Nuevo Producto</h2>
                    <p className="text-slate-400 text-xs">Completá los datos del nuevo artículo para el catálogo</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ej: Teclado Mecánico RGB Pro"
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Categoría</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Ej: Periféricos"
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Breve detalle del producto..."
                            rows="3"
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Inicial</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            min="0"
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 text-sm mt-4 cursor-pointer"
                    >
                        <PackagePlus className="w-4 h-4" /> Guardar Producto
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;