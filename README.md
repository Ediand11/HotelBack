## Документация API для приложения

### Регистрация пользователя

- **URL**: [/users](file:///Users/levbaldin/Code/diplom/hotel-backend/src/app.module.ts#7%2C37-7%2C37)
- **Метод**: [POST](file:///Users/levbaldin/Code/diplom/hotel-backend/src/app.module.ts#31%2C48-31%2C48)
- **Тело запроса**:
  ```json
  {
    "username": "string",
    "email": "string@example.com",
    "password": "string",
    "role": "admin | guest"
  }
  ```
- **Ответ**:
  - **Код**: 200 (OK)
  - **Тело ответа**:
    ```json
    {
      "username": "string",
      "email": "string@example.com"
    }
    ```

### Авторизация пользователя

- **URL**: `/users/login`
- **Метод**: `POST`
- **Тело запроса**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Ответ**:
  - **Код**: 200 (OK)
  - **Тело ответа**:
    ```json
    {
      "username": "string",
      "email": "string@example.com"
    }
    ```

### Получение информации о текущем пользователе

- **URL**: `/users/user`
- **Метод**: `GET`
- **Ответ**:
  - **Код**: 200 (OK)
  - **Тело ответа**:
    ```json
    {
      "username": "string",
      "email": "string@example.com"
    }
    ```
