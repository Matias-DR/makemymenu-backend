# MakeMyMenu

¡Bienvenido!

Este proyecto permite a través de varias [APIs](https://es.wikipedia.org/wiki/API) administrar el ABM de usuarios.

## Requisitos previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/en), y luego [PNPM](https://pnpm.io/) en tu máquina (en ese orden).

## Instalación

1. Clona el repositorio:

  ```bash
  git clone https://github.com/Matias-DR/makemymenu-backend.git
  ```

2. Posiciónate sobre el proyecto:

  ```bash
  cd ./makemymenu-backend
  ```

3. Instala las dependencias:

  ```bash
  pnpm i
  ```

## Variables de entorno

1. Creación del almacenamiento

En la raíz del proyecto, cree un archivo con el nombre ".env"

2. Configuración

  ```bash
  MONGODB_URI=<mongodb-cluster-connection-string> // Por ejemplo: mongodb+srv://<usuario>:<contraseña>@cluster.<codigo-de-cluster>.mongodb.net/<nombre-de-db-dentro-del-cluster>?retryWrites=true&w=majority
  EXPRESS_SERVER_PORT=<custom-port>|3000
  EXPRESS_SERVER_HOST=<custom-server-host>|localhost
  ```
## Ejecución

1. Posiciónate sobre el proyecto:

  ```bash
  cd ./makemymenu-backend
  ```

2. Ejecuta y establece las conexiones del servidor y la base de datos

  ```bash
  pnpm run start
  ```