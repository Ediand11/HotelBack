CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'guest') NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Guests (
    id INT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15),
    FOREIGN KEY (id) REFERENCES Users(id)
);

CREATE TABLE Rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    number VARCHAR(50) NOT NULL,
    type ENUM('single', 'double', 'suite') NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    guest_id INT NOT NULL,
    room_id INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    status ENUM('active', 'cancelled') NOT NULL,
    FOREIGN KEY (guest_id) REFERENCES Guests(id),
    FOREIGN KEY (room_id) REFERENCES Rooms(id)
);

CREATE TABLE Administrators (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES Users(id)
);