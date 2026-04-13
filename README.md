<h1 align="center">
  🚀 Kanban Pro API
</h1>

<p align="center">
  <strong>Aplicación Fullstack de Gestión de Tareas (Kanban) con Server-Side Rendering</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" alt="Sequelize" />
  <img src="https://img.shields.io/badge/Handlebars.js-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=black" alt="Handlebars" />
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
</p>
---

## 📖 Sobre el Proyecto

**Kanban Pro** es una robusta aplicación web fullstack diseñada para la gestión ágil de proyectos utilizando la metodología Kanban. Construida con un enfoque en el rendimiento, la seguridad y una arquitectura escalable, esta plataforma permite a los usuarios registrarse, autenticarse y organizar su trabajo visualmente mediante tableros, listas y tarjetas.

## Este proyecto destaca por implementar **Server-Side Rendering (SSR)** para una entrega rápida de contenido, junto con una base de datos relacional sólida controlada a través de un ORM moderno, cumpliendo con los estándares de la industria para el desarrollo backend.

## 🎯 Por Qué Desarrollé Este Proyecto

_Kanban Pro_ es más que una simple To-Do List. Nació con el objetivo de **desarrollar habilidades backend** en el marco del bootcamp Fullstack JavaScript (Ejercicio Final Modulo 8) de Mindhub.

Pero mi objetivo personal es poder crear una aplicación que sea realmente util y que pueda utilizarse a diario para organizar mis tareas y proyectos, por lo que seguí desarrollando el proyecto para que cumpliera con mis expectativas, hasta que se convirtió en lo que es hoy.

Aborda los desafíos reales como:

- El manejo eficiente del _state_ de sesión del usuario de forma nativa sin requerir Single Page Applications (SPAs).
- La implementación del patrón MVC (Modelo-Vista-Controlador) para conseguir un código predecible y altamente mantenible a largo plazo.
- El diseño un esquema de base de datos relacional robusto para evitar datos huérfanos.

---

## ✨ Características Principales

- **Autenticación de Usuarios Segura:** Implementación de flujos de registro e inicio de sesión utilizando contraseñas hasheadas (`bcryptjs`) y **JSON Web Tokens (JWT)** almacenados de forma segura en `HttpOnly Cookies`, mitigando vulnerabilidades como XSS.
- **Arquitectura MVC y SSR:** Interfaz de usuario dinámica y renderizada desde el servidor utilizando **Handlebars (HBS)**. Vistas modulares (partials) que aseguran un código frontend mantenible e inyección dinámica desde el backend (Express).
- **Gestión Jerárquica Completa (CRUD):**
  - **Tableros (Boards):** Creación, edición y eliminación de múltiples entornos de trabajo.
  - **Listas (Lists):** Clasificación de los flujos de trabajo (Ej: _Asignado_, _En Progreso_, _Finalizado_).
  - **Tarjetas (Cards):** Inserción, actualización y borrado ágil de las tareas específicas.
  - **Flujo**: Cambio rápido e intuitivo en la lista donde se encuentra la tarjeta.
- **Base de Datos Relacional Eficiente:** Esquema de datos modelado con **PostgreSQL**, utilizando **Sequelize ORM** para las relaciones (Asociaciones entre Usuario -> Tablero -> Lista -> Tarjeta), migraciones y sincronización.
- **UI/UX Limpia y Responsiva:** Interfaz de usuario diseñada con **Bootstrap 5**, asegurando que la plataforma sea intuitiva y accesible en cualquier dispositivo, enriquecida con `bootstrap-icons`.
- **Rutas Protegidas:** Middlewares personalizados (`verifyToken`) que aseguran que únicamente los usuarios autenticados tengan acceso y control sobre sus propios proyectos (`Dashboard`).

---

## 🛠️ Stack Tecnológico

**Backend:**

- **Node.js & Express:** Motor de la aplicación y enrutamiento robusto.
- **PostgreSQL & Sequelize:** Base de datos relacional con ORM orientado a objetos, garantizando la persistencia e integridad referencial.
- **Method-Override:** Habilita operaciones RESTful completas (Añade PUT & DELETE) desde formularios HTML.

**Seguridad:**

- **JWT & Cookie-Parser:** Manejo de sesiones _stateless_ seguras.
- **Bcrypt.js:** Cifrado asimétrico para la información sensible (contraseñas).

**Frontend:**

- **Handlebars (hbs):** Motor de plantillas SSR dinámico.
- **Bootstrap 5:** Componentes estilizados y diseño responsivo adaptativo (Mobile-first).

---

## 🚀 Instalación y Uso Local

Sigue estos pasos para desplegar el proyecto en tu entorno local:

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/Kanban_Pro.git
   cd Kanban_Pro
   ```

2. **Instalar las dependencias:**
   Utiliza [pnpm](https://pnpm.io/) (el package manager definido en el proyecto) o npm:

   ```bash
   pnpm install
   ```

3. **Configurar las Variables de Entorno:**
   Crea un archivo `.env` en la raíz del proyecto y define los siguientes parámetros:

   ```env
   PORT=3000
   # Configuración de base de datos PostgreSQL
   DB_NAME=tu_base_de_datos
   DB_USER=tu_usuario_pg
   DB_PASSWORD=tu_contraseña_pg
   DB_HOST=127.0.0.1
   DB_PORT=5432
   # Configuración de seguridad JWT
   JWT_SECRET=tu_clave_secreta_super_segura
   ```

4. **Ejecutar el Servidor:**
   Puedes iniciar la aplicación en modo desarrollo (utiliza `nodemon` para hot-reloads en archivos `.js` y `.hbs`):

   ```bash
   pnpm run dev
   ```

5. **Acceso a la plataforma:**
   Abre tu navegador y visita: `http://localhost:3000`

---

## 🧠 Arquitectura de la Base de Datos

El diseño de la base de datos sigue una estructura relacional estricta:

1. `Usuario` (1:N) `Tableros`
2. `Tablero` (1:N) `Listas`
3. `Lista` (1:N) `Tarjetas`

## Esto significa que cuando un usuario inicia sesión, la aplicación carga de forma eficiente (usando _eager loading_ en Sequelize) todo su panel de trabajo (`find_by_pk` -> `include`).

<p align="center">
  Hecho por <strong>Oliver Barra (Cuackzoide)</strong>
</p>

<p align="center">
  <a href="https://linkedin.com/in/oliver-barra-cuackzoide">LinkedIn</a> • 
  <a href="https://github.com/Cuackzoide">GitHub</a> • 
  <a href="mailto:barraoliver94@gmail.com">Contacto</a>
</p>
