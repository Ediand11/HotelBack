# Документация API для пользователей

## Создание администратора

**POST** `/users/admin`

### Тело запроса

```json
{
  "username": "adminUser",
  "email": "admin@example.com",
  "password": "securePassword",
  "name": "Admin Name"
}
```

### Ответ

- **200 OK** При успешном создании
- **422 Unprocessable Entity** Если email уже используется

## Создание гостя

**POST** `/users/guest`

### Тело запроса

```json
{
  "username": "guestUser",
  "email": "guest@example.com",
  "password": "securePassword",
  "firstName": "Guest",
  "lastName": "User",
  "phoneNumber": "1234567890"
}
```

### Ответ

- **200 OK** При успешном создании
- **422 Unprocessable Entity** Если email уже используется

## Вход администратора

**POST** `/users/admin/login`

### Тело запроса

```json
{
  "username": "adminUser",
  "password": "securePassword"
}
```

### Ответ

- **200 OK** При успешном входе
- **422 Unprocessable Entity** Если пользователь не найден или пароль неверен

## Вход гостя

**POST** `/users/guest/login`

### Тело запроса

```json
{
  "username": "guestUser",
  "password": "securePassword"
}
```

### Ответ

- **200 OK** При успешном входе
- **422 Unprocessable Entity** Если пользователь не найден или пароль неверен

## Получение текущего пользователя

**GET** `/users/user`

### Ответ

- **200 OK** При успешном запросе
- **401 Unauthorized** Если пользователь не авторизован

Все запросы должны содержать соответствующие заголовки для авторизации, если это необходимо.
