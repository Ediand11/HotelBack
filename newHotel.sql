CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'housekeeping', 'financial', 'reception', 'guest') NOT NULL,
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

CREATE TABLE Buildings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    star_rating ENUM('two', 'five') NOT NULL,
    floors INT NOT NULL,
    total_rooms INT NOT NULL,
    rooms_per_floor INT NOT NULL
);

CREATE TABLE Services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE RoomServices (
    room_id INT NOT NULL,
    service_id INT NOT NULL,
    FOREIGN KEY (room_id) REFERENCES Rooms(id),
    FOREIGN KEY (service_id) REFERENCES Services(id),
    PRIMARY KEY (room_id, service_id)
);

CREATE TABLE Organizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('tourism', 'conference', 'seminar', 'carnival') NOT NULL
);

CREATE TABLE GroupBookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    organization_id INT NOT NULL,
    booking_id INT NOT NULL,
    floor INT NOT NULL,
    room_count INT NOT NULL,
    people_count INT NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES Organizations(id),
    FOREIGN KEY (booking_id) REFERENCES Bookings(id)
);

CREATE TABLE Complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    guest_id INT NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    resolved BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (guest_id) REFERENCES Guests(id)
);

CREATE TABLE FinancialRecords (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('income', 'expense') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    description TEXT
);
