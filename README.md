## Документация API

### Создание администратора

- **URL**: `/users/admin`
- **Метод**: [POST](file:///Users/levbaldin/Code/diplom/hotel-backend/README.md#6%2C15-6%2C15)
- **Тело запроса**:
  ```json
  {
    "username": "string",
    "email": "string@example.com",
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

### Создание гостя

- **URL**: `/users/guest`
- **Метод**: `POST`
- **Тело запроса**:
  ```json
  {
    "username": "string",
    "email": "string@example.com",
    "password": "string"
  }
  ```
- **Ответ**:
  - **Код**: 200 (OK)
  - **Тело ответа**:
    ```json
    {
      "username":
      "email": "string@example.com"
    }
    ```

### Авторизация администратора

- **URL**: `/users/admin/login`
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

### Авторизация гостя

- **URL**: `/users/guest/login`
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
