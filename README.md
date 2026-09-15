# StockControl - Frontend

Interfaz web para la **gestión de inventario, catálogo de productos y control de existencias en tiempo real**.

Desarrollada con **React**, **Vite** y **Tailwind CSS**.

---

## 🚀 Tecnologías utilizadas

* **[React](https://react.dev/)** — Biblioteca principal para la interfaz de usuario.
* **[Vite](https://vite.dev/)** — Herramienta de desarrollo y build.
* **[React Router DOM](https://reactrouter.com/)** — Enrutamiento de la aplicación SPA.
* **[Tailwind CSS](https://tailwindcss.com/)** — Framework de estilos.
* **[Lucide React](https://lucide.dev/)** — Iconografía.
* **[Axios](https://axios-http.com/)** — Cliente HTTP para comunicación con la API.
* **[SweetAlert2](https://sweetalert2.github.io/)** — Notificaciones e interacciones con el usuario.

---

## 🛠️ Instalación y configuración local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Romimarrone/stock-control-frontend.git
cd stock-control-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crea un archivo `.env` en la raíz del proyecto y configura la URL de la API:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Ejecutar en entorno de desarrollo

```bash
npm run dev
```

Una vez iniciado el servidor, Vite mostrará en la terminal la URL local para acceder a la aplicación.

---

## 📦 Scripts disponibles

| Comando           | Descripción                                       |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo local.           |
| `npm run build`   | Compila la aplicación optimizada para producción. |
| `npm run preview` | Previsualiza localmente la build de producción.   |

---

## 🚀 Despliegue en producción

El proyecto está preparado para realizar un despliegue continuo utilizando **Vercel**.

### Configuración

1. Vincula el repositorio de GitHub desde el panel de Vercel.

2. Configura la variable de entorno:

   ```env
   VITE_API_URL=https://your-production-api-url/api
   ```

3. Asegúrate de incluir el archivo `vercel.json` en la raíz del proyecto para habilitar correctamente el redireccionamiento de rutas de la **Single Page Application (SPA)**.

---

## 🔐 Autenticación y roles

El sistema implementa un modelo de **control de acceso basado en roles (RBAC)** mediante `AuthContext`.

| Rol                     | Permisos                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| **Público**             | Acceso a las vistas de inicio de sesión y registro.                                        |
| **Usuario autenticado** | Lectura del catálogo y filtrado de productos por categoría.                                |
| **Administrador**       | Ajuste directo del stock de productos y alta de nuevos artículos mediante `/products/new`. |

---

## 📁 Estructura general

La aplicación está organizada como una SPA, utilizando React Router para la navegación y `AuthContext` para gestionar el estado de autenticación y los permisos de usuario.

---

## 📄 Licencia

Este proyecto es de uso privado.
