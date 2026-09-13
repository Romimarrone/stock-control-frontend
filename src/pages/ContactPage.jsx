import { useState } from 'react';
import Swal from 'sweetalert2';
import { Mail, Send, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado',
            text: 'Gracias por contactarte. Te responderemos a la brevedad.',
            confirmColor: '#6366f1',
        });
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <Mail className="w-8 h-8 text-indigo-500" /> Contacto
                    </h1>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        ¿Tenés consultas sobre la plataforma o querés solicitar soporte técnico? Envianos un mensaje.
                    </p>
                </div>

                <div className="space-y-4 text-slate-300 text-sm bg-slate-800/40 p-5 rounded-xl border border-slate-700/50">
                    <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
                        <span>San Miguel de Tucumán, Argentina</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-indigo-400 shrink-0" />
                        <span>+54 (381) 000-0000</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
                        <span>soporte@stockcontrol.dev</span>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-200 mb-1">Nombre</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-200 mb-1">Correo Electrónico</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-200 mb-1">Mensaje</label>
                        <textarea
                            rows="4"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-600/20"
                    >
                        <Send className="w-4 h-4" /> Enviar Mensaje
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;