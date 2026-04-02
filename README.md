# 📋 Kanban Pro (FullStack)

## 📝 Descripción
- Esta es una App web que funciona sobre una API diseñada para gestionar un tablero Kanban profesional. 
- El sistema permite la administración de usuarios y sesiones (Register, Login, Logout) con hash de contraseñas con bcrypt y middleware con JWT para sesiones.
- Cada usuario puede administrar por completo (CRUD) sus tableros, listas y tareas proporcionando una estructura de datos sólida para aplicaciones de productividad. 
- Este proyecto fue desarrollado como el **Examen Final del Módulo 8 en MindHub LA**, enfocándose en la creación de un servidor escalable con Node.js y la persistencia de datos relacionales.

🌐 **API Base URL:** En proceso de despliegue...

---

## 🛠️ Stack Tecnológico

- **Entorno de Ejecución:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Base de Datos:** [PostgreSQL](https://www.postgresql.org/)
- **Gestión de Paquetes:** [pnpm](https://pnpm.io/)
- **Despliegue:** Render

---

## 🚀 Funcionalidades Principales

- **Arquitectura CRUD:** Implementación completa para Crear, Leer, Actualizar y Eliminar tareas del tablero.
- **Persistencia Relacional:** Modelado de datos eficiente en PostgreSQL con Squelize ORM para garantizar la integridad de la información.
- **Middleware de Seguridad:** Manejo de rutas protegidas con JsonWebToken para consumo seguro desde clientes Frontend.
- **Respuestas Server Side Rendering:** Entrega de datos JSON inyectados en plantillas HTML dinámicas elaboradas con Handlebars (hbs).

---

## 📂 Estructura del Código

```text
├── src/
│   ├── controllers/ # Lógica de manejo de peticiones
│   ├── routes/      # Definición de endpoints
│   ├── models/      # Consultas y modelos de datos (SQL)
│   └── app.js       # Configuración central del servidor
├── .env.example     # Plantilla de variables de entorno
└── package.json     # Dependencias y scripts
```
## 🔧 Instalación y Configuración

1. Clonar el repositorio:
```Bash
git clone [https://github.com/Cuackzoide/EF_M8-Kanban_Pro_Api.git](https://github.com/Cuackzoide/EF_M8-Kanban_Pro_Api.git)
cd EF_M8-Kanban_Pro_Api
```

2. Instalar dependencias:
```Bash
pnpm install
```
3. Configurar la Base de Datos:
Crea un archivo .env basado en .env.example y completa tus credenciales de PostgreSQL.

4. Ejecutar en modo desarrollo:
```Bash
pnpm run dev
```
5. Ingresar al servidor local:
Registrar un usuario, logearse y probar CRUD de tableros, listas y tareas.

## 🎓 Contexto Académico
**Proyecto final correspondiente al Módulo 8:** 
- Desarrollo de APIs con Node, Express y PostgreSQL del Bootcamp Fullstack JavaScript de MindHub. 
- Demuestra competencia en el diseño de arquitecturas backend y manejo de bases de datos con estandares de la industria.

Desarrollado por **Oliver Barra**
