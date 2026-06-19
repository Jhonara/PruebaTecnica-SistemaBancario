# Sistema de Gestión de Préstamos Bancarios

Prueba técnica desarrollada con Spring Boot y React para la gestión de préstamos bancarios.

## Tecnologías utilizadas

### Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* PostgreSQL
* JWT
* Maven
* Lombok

### Frontend

* React
* Vite
* Axios
* Bootstrap
* SweetAlert2

## Funcionalidades

### Usuario

* Iniciar sesión
* Solicitar préstamos
* Consultar estado de préstamos

### Administrador

* Iniciar sesión
* Consultar solicitudes de préstamos
* Aprobar préstamos
* Rechazar préstamos

### Seguridad

* Autenticación mediante JWT
* Control de acceso basado en roles (ADMIN / USER)
* Protección de endpoints con Spring Security

---

# Estructura del proyecto

```text
PruebaTecnica-SistemaBancario
│
├── prestamos-back
│
└── prestamos-front
```

---

# Configuración Backend

## Base de datos

Crear una base de datos PostgreSQL:

```sql
CREATE DATABASE prestamosdb;
```

Configurar el archivo:

```properties
prestamos-back/src/main/resources/application.properties
```

Ejemplo:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/prestamosdb
spring.datasource.username=postgres
spring.datasource.password=postgres

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## Ejecutar Backend

Ingresar a la carpeta:

```bash
cd prestamos-back
```

Ejecutar:

```bash
mvn spring-boot:run
```

La API quedará disponible en:

```text
http://localhost:8080
```

---

# Ejecutar Frontend

Ingresar a la carpeta:

```bash
cd prestamos-front
```

Instalar dependencias:

```bash
npm install
```

Ejecutar:

```bash
npm run dev
```

La aplicación quedará disponible en:

```text
http://localhost:5173
```

---

# Usuarios de prueba

## Administrador

```text
Correo: admin@test.com
Contraseña: 123456
```

## Usuario

```text
Correo: jhonatan@test.com
Contraseña: 123456
```

---

# Endpoints principales

## Login

```http
POST /auth/login
```

## Solicitar préstamo

```http
POST /api/prestamos
```

## Consultar préstamos

```http
GET /api/prestamos
```

## Aprobar préstamo

```http
PUT /api/prestamos/{id}/aprobar
```

## Rechazar préstamo

```http
PUT /api/prestamos/{id}/rechazar
```

---

# Autor

Jhonatan Stiven Ramirez Useche
Ingeniero de Sistemas
