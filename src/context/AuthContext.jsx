import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    // Cargar perfil si existe un token guardado al iniciar/recargar
    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const { data } = await api.get('/auth/me');
                    setUser(data.data);
                } catch (error) {
                    console.error('Error al verificar sesión:', error);
                    logout();
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        fetchUser();
    }, [token]);

    // Función de Login: Delegamos la petición directamente al Context
    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        const { token: userToken, ...userData } = data.data;

        localStorage.setItem('token', userToken);
        setToken(userToken);
        setUser(userData);
        return userData;
    };

    // Función de Registro
    const register = async (name, email, password) => {
        const { data } = await api.post('/auth/register', { name, email, password });
        const { token: userToken, ...userData } = data.data;

        localStorage.setItem('token', userToken);
        setToken(userToken);
        setUser(userData);
        return userData;
    };

    // Función de Logout
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAuthenticated: !!user,
                isAdmin: user?.role === 'admin',
                login,
                register,
                logout,
            }}
        >
            {/* Evita parpadeos en las rutas renderizando los hijos solo al terminar la verificación */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
    }
    return context;
};