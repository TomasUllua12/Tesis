# Finverse

**Finverse** es una plataforma interactiva de aprendizaje sobre finanzas personales. Permite a los usuarios aprender mediante escenarios prácticos y gamificación, integrando tecnologías modernas para facilitar el aprendizaje financiero.

## Tecnologías utilizadas

- **Frontend**: React.js
- **Backend**: Node.js (Express)
- **Base de datos**: MySQL

## Requisitos previos

Asegúrate de tener instalado en tu máquina:

- Node.js (v16.0.0 o superior)
- MySQL (v8.0 o superior)
- npm o yarn

## Instalación y configuración

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tuusuario/finverse.git
   cd finverse

Instala las dependencias del proyecto:

### Para el backend
   ```bash
   cd server
   npm install
   cd ..
   ```
### Para el frontend
```bash
   cd client
   npm install
   cd ..
```

# 🛠️ **Backend - Descripción Técnica**
El backend de esta aplicación fue desarrollado con Node.js y Express, ofreciendo una API REST que permite registrar usuarios, iniciar sesión y gestionar la compra de mejoras dentro de la plataforma.

## 📁 Estructura del Proyecto
```bash
   server/
   │
   ├── config/
   │   └── db.js               # Configuración de la conexión a MySQL
   │
   ├── controllers/
   │   ├── authController.js   # Registro y login de usuarios (con bcrypt y JWT)
   │   └── improvementController.js # Compra de mejoras y actualización de monedas
   │
   ├── middlewares/
   │   └── authMiddleware.js   # Verificación de tokens JWT para proteger rutas
   │
   ├── routes/
   │   ├── authRoutes.js       # Rutas públicas: /register y /login
   │   └── improvementRoutes.js# Ruta protegida: /buy-improvement
   │
   ├── .env                    # Variables de entorno (credenciales, claves, puerto)
   ├── index.js                # Archivo principal que levanta el servidor
   └── ...
```
## 🔐 Autenticación
Se utiliza JWT (JSON Web Tokens) para generar y verificar tokens de autenticación.

Las contraseñas se encriptan con bcryptjs antes de almacenarse en la base de datos.

Las rutas sensibles (como la compra de mejoras) están protegidas mediante un middleware de autenticación.

## 🧠 Lógica del sistema
Los usuarios se registran y obtienen un token al iniciar sesión.

Este token se envía en las cabeceras para acceder a rutas protegidas.

Al comprar una mejora:

Se valida que el usuario tenga monedas suficientes.

Se actualizan sus monedas y se registra la mejora en su perfil.

Se guarda todo en la base de datos MySQL.

## 🧪 Ruta de prueba
GET /
Responde con "Listening..." para verificar que el servidor está activo.

## ⚙️ Tecnologías utilizadas
- Node.js y Express
- MySQL (vía mysql2/promise)
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- CORS (cors)
- Postman (para pruebas de endpoints)
