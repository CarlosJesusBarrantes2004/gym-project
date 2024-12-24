# Sistema de Gestión de Gimnasio

Un sistema de gestión de gimnasio responsivo y liviano construido con React para el frontend y Node.js (Express) para el backend. Diseñado para un gimnasio pequeño para gestionar recursos de manera eficiente y mantener un rendimiento óptimo.

---

## Funcionalidades

### Backend (Node.js - Express)

- **Estructura:** Organizado en `routes`, `controllers` y `middleware`.
- **Base de Datos:** SQLite3 se utiliza por sus propiedades livianas y eficientes en recursos.
- **Autenticación:** Autenticación de usuarios con nombre de usuario y contraseña utilizando JSON Web Tokens (JWT), almacenados en `localStorage`.
- **Validación:** Validación de formularios y datos manejada con `zod`.
- **Librerías Clave:**
  - `express` para la configuración del servidor.
  - `jsonwebtoken` (JWT) para autenticación segura.
  - `zod` para validación de esquemas.
  - `sqlite3` para operaciones con la base de datos.

### Frontend (React)

- **Diseño:** Diseño completamente responsivo implementado con Tailwind CSS. Optimizado para móviles, tabletas, laptops y pantallas de escritorio.
- **Gestión de Estado:** Manejo eficiente del estado con las funcionalidades integradas de React.
- **Rutas:** Manejado con `react-router-dom`.
- **Formularios:** Administrados con `react-hook-form`.
- **Integración API:** Comunicación con el backend utilizando `axios`.
- **Hooks Personalizados:** Pequeños hooks reutilizables creados para manejar lógica específica.
- **Componentes:** Todo está separado en componentes reutilizables y mantenibles.

---

## Instalación y Configuración

### Backend

1. Navega al directorio `server/`:
   ```bash
   cd server
   ```
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` y configura las variables de entorno:
   ```env
   PORT=3000
   JWT_SECRET=tu_secreto_jwt
   ```
4. Inicia el servidor:
   ```bash
   npm start
   ```

### Frontend

1. Navega al directorio `client/`:
   ```bash
   cd client
   ```
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```

---

## Estructura del Proyecto

```
Gym/
├── client/        # Código del frontend
│   ├── src/       # Componentes, hooks y páginas de React
│   ├── public/    # Recursos estáticos
│   └── ...
├── server/        # Código del backend
│   ├── src
    |    ├──/routes/    # Rutas de la API
│   |    ├── controllers/ # Lógica de negocio
│   |    ├──middleware/ # Middleware para validación y autenticación
│   ├── gym.db     # Base de datos SQLite
│   ├── .env       # Variables de entorno (ignoradas por Git)
│   └── ...
└── README.md      # Descripción del proyecto
```

---

## Uso

1. Registra una cuenta de usuario a través del frontend.
2. Inicia sesión con tu nombre de usuario y contraseña.
3. Usa el sistema para gestionar actividades del gimnasio y monitorear recursos de manera eficiente.

---

## Tecnologías Utilizadas

### Backend

- Node.js
- Express.js
- SQLite3
- JWT
- Zod

### Frontend

- React
- React Router DOM
- React Hook Form
- Axios
- Tailwind CSS

---

## Contribuciones

Siéntete libre de forkear este repositorio y enviar pull requests para mejoras o funciones adicionales.
