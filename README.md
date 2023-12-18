# MakeMyMenu

¡Bienvenido!

Este proyecto permite a través de [APIs](https://es.wikipedia.org/wiki/API) (indicadas por debajo) administrar un ABM de usuarios.

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

En la raíz del proyecto, crea un archivo con el nombre ".env" que contenga las siguientes variables

  ```bash
  MONGODB_URI=<mongodb-cluster-connection-string> // Por ejemplo: mongodb+srv://<usuario>:<contraseña>@cluster.<codigo-de-cluster>.mongodb.net/<nombre-de-db-dentro-del-cluster>?retryWrites=true&w=majority
  MONGODB_SELECTED_DB=<db-in-cluster-name>
  EXPRESS_SERVER_PORT=<custom-port>|3000
  EXPRESS_SERVER_HOST=<custom-server-host>|localhost
  JWT_SECRET=<secret-string>
  ```

## Ejecución

1. Posiciónate sobre el proyecto y ejecútalo:

  ```bash
  cd ./makemymenu-backend
  pnpm run start
  ```

## APIs

### /api/auth

- POST
```
request.body: {
  email:ex00@ex.com
  password:123qwe78
}
```

### /api/user

- POST
```
request.body: {
  email:ex00@ex.com,
  password:123qwe78,
  passwordConfirmation:123qwe78
}
```

- PATCH
```
headers.authorization: 'Bearer <access-token>'
request.body: {
  password:123qwe78
  newEmail:ex00@ex.com_
  newPassword:123qwe78_
  newPasswordConfirmation:123qwe78_
}
```

- DELETE
```
headers.authorization: 'Bearer <access-token>'
request.body: {
  password:123qwe78
}
```

### /api/session

- PATCH
```
headers.authorization: 'Bearer <refresh-token>'
```

### /api/session/refresh

- DELETE
```
headers.authorization: 'Bearer <refresh-token>'
```

### /api/session/access

- DELETE
```
headers.authorization: 'Bearer <access-token>'
```

#

> [!NOTE]
> _Este proyecto está basado y estructurado bajo la arquitectura [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)_