# Документация API для пользовательских запросов

## Создание администратора

**POST** `/users/admin`

Создает нового администратора.

### Тело запроса

```json
{
  "username": "adminUser",
  "email": "admin@example.com",
  "password": "securePassword",
  "name": "Admin Name",
  "role": "admin"
}
```

### Ответ

- **200 OK** - Успешное создание администратора.
- **422 Unprocessable Entity** - Невозможно обработать данные (например, если email уже используется).

## Создание гостя

**POST** `/users/guest`

Создает нового гостя.

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

- **200 OK** - Успешное создание гостя.
- **422 Unprocessable Entity** - Невозможно обработать данные (например, если email уже используется).

## Вход администратора

**POST** `/users/admin/login`

Аутентификация администратора и получение токена.

### Тело запроса

```json
{
  "username": "adminUser",
  "password": "securePassword"
}
```

### Ответ

- **200 OK** - Успешная аутентификация.
- **422 Unprocessable Entity** - Неверные учетные данные.

## Вход гостя

**POST** `/users/guest/login`

Аутентификация гостя и получение токена.

### Тело запроса

```json
{
  "username": "guestUser",
  "password": "securePassword"
}
```

### Ответ

- **200 OK** - Успешная аутентификация.
- **422 Unprocessable Entity** - Неверные учетные данные.

## Получение текущего пользователя

**GET** `/users/user`

Получение данных текущего аутентифицированного пользователя.

### Ответ

- **200 OK** - Возвращает данные пользователя.
- **401 Unauthorized** - Пользователь не аутентифицирован.

## Обновление пользователя

**POST** `/users/update/:id`

Обновление данных пользователя.

### Параметры пути

- `id` - ID пользователя.

### Тело запроса

```json
{
  "username": "updatedUser",
  "email": "updated@example.com",
  "role": "manager"
}
```

### Ответ

- **200 OK** - Успешное обновление данных пользователя.
- **404 Not Found** - Пользователь не найден.
