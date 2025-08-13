CREATE DATABASE EcomCarRental;
USE EcomCarRental;

CREATE TABLE admins(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'Admin',
  PRIMARY KEY (id)
);

INSERT INTO admins (name, email, password_hash, role) VALUES ('John Doe', 'john.doe@gmail.com', '$2b$10$qGXiab/c2IMgrOaD02q92upJD7mdDeZlZ4MB8Hz3B6xQq0wg25PTm', 'admin');

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT DEFAULT NULL,
  phone_number VARCHAR(15),
  google_id VARCHAR(255) UNIQUE DEFAULT NULL,
  is_google_user TINYINT DEFAULT 0
);

CREATE TABLE vehicles (
  car_id INT PRIMARY KEY AUTO_INCREMENT,
  model_name VARCHAR(100) NOT NULL,
  brand VARCHAR(100),
  year INT,
  seats INT,
  color VARCHAR(50),
  description TEXT,
  rental_price_per_day DECIMAL(10, 2),
  number_plate VARCHAR(20) UNIQUE NOT NULL ,
  is_available BOOLEAN DEFAULT TRUE
);

CREATE TABLE drivers (
  driver_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15),
  license_number VARCHAR(50) UNIQUE NOT NULL,
  vehicle_assigned INT,  -- FK to vehicles.car_id (optional)
  status ENUM('Active', 'Inactive', 'Suspended') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (vehicle_assigned) REFERENCES vehicles(car_id)
);


CREATE TABLE bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  car_id INT NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (car_id) REFERENCES vehicles(car_id)
);

CREATE TABLE reviews (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  car_id INT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (car_id) REFERENCES vehicles(car_id)
);

CREATE TABLE payments (
  payment_id INT PRIMARY KEY AUTO_INCREMENT,
  booking_id INT NOT NULL,
  user_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_method ENUM('Card', 'EFT', 'Cash', 'Mobile') NOT NULL,
  payment_status ENUM('Pending', 'Paid', 'Failed') DEFAULT 'Pending',
  payment_reference VARCHAR(100), -- e.g. Stripe/Paystack ref
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE refunds (
  refund_id INT PRIMARY KEY AUTO_INCREMENT,
  payment_id INT NOT NULL,
  refund_amount DECIMAL(10,2) NOT NULL,
  refund_reason VARCHAR(255),
  refund_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (payment_id) REFERENCES payments(payment_id)
);

INSERT INTO vehicles
(model_name, brand, year, seats, color, description, rental_price_per_day, number_plate, is_available)
VALUES
('Golf GTI', 'Volkswagen', 2024, 5, 'Grey', 'Electric luxury sedan', 475.00, 'VW2024GTI', 1),
('A200', 'Mercedes-Benz', 2024, 5, 'Grey', 'The Mercedes-Benz A200 is a compact luxury hatchback that embodies modern elegance and advanced technology. It offers a refined driving experience with a turbocharged engine, a sleek and aerodynamic design, and a high-tech interior featuring the latest MBUX infotainment system with voice control. The A200 balances performance, comfort, and style, making it a top choice for those seeking luxury in a smaller, practical package.', 570.00, 'MB2024A20', 1),
('RS5', 'Audi', 2019, 5, 'Grey', 'The 2019 Audi RS5 is a high-performance luxury coupe with a powerful twin-turbo V6 engine, sporty handling, and a refined interior. It combines speed and comfort with Audi’s Quattro all-wheel-drive system.', 1045.00, 'AUD2019RS5', 1),
('M4', 'BMW', 2015, 4, 'Grey', 'The BMW M4 is a high-performance luxury coupe offering sharp handling, a powerful turbocharged engine, and a sporty yet refined design—perfect for enthusiasts who want speed and style.', 950.00, 'BMW2015M4', 1),
('Ghost Series I', 'Rolls-Royce', 2014, 5, 'White', 'The 2014 Rolls-Royce Ghost is a luxury full-size sedan with a powerful 6.6-liter V12 engine. It offers a refined, elegant design and a meticulously crafted interior with top-quality materials for ultimate comfort.', 2280.00, 'RR2014GHT', 1),
('XF', 'Jaguar', 2020, 5, 'Black', 'The 2020 Jaguar XF is a luxury midsize sedan that combines sporty performance with elegant design. It offers a comfortable, tech-rich interior and smooth handling, powered by efficient yet powerful engine options.', 760.00, 'JAG2020XF', 1),
('300C', 'Chrysler', 2014, 5, 'Grey', 'The 2014 Chrysler 300C is a full-size luxury sedan known for its bold, muscular design and spacious, comfortable interior. It features a powerful V8 engine option and combines classic American style with modern technology and refinement.', 665.00, 'CHR2014300', 1),
('Range Rover Sport', 'Land Rover', 2024, 5, 'Black', 'The 2024 Range Rover Sport is a luxury SUV combining strong off-road ability with a sleek, tech-filled interior and powerful engines.', 1330.00, 'LR2024RSP', 1),
('Mustang', 'Ford', 2021, 4, 'Red', 'The 2021 Ford Mustang is a sporty muscle car with bold looks, powerful engines, and sharp handling.', 855.00, 'FD2021MST', 1),
('Continental', 'Bentley', 2019, 4, 'Black', 'The 2019 Bentley Continental combines handcrafted luxury with powerful performance. Featuring a sleek black exterior, advanced technology, and plush seating for four, it delivers a smooth and prestigious grand touring experience.', 550.00, 'BNT2019GP', 1),
('LX 500d', 'Lexus', 2023, 7, 'White', 'The 2023 Lexus LX 500d is a premium full-size SUV blending powerful diesel performance with modern luxury. With seating for seven, advanced safety features, and a refined interior, it is built for comfort and capability on any terrain.', 400.00, 'LX2023GP', 1),
('S500', 'Mercedes-Benz', 2014, 5, 'Silver', 'The 2014 Mercedes-Benz S500 is a flagship luxury sedan offering refined performance, advanced technology, and exceptional comfort. With its elegant design and smooth driving dynamics, it delivers a prestigious driving experience.', 300.00, 'S5002014GP', 1);

CREATE TABLE vehicle_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    car_id INT NOT NULL,
    image_url TEXT NOT NULL,
    FOREIGN KEY (car_id) REFERENCES vehicles(car_id) ON DELETE CASCADE
);

INSERT INTO vehicle_images (car_id, image_url) VALUES
(1, 'https://img.autotrader.co.za/40310763'),
(1, 'https://img.autotrader.co.za/40310765/Fit508x373'),
(1, 'https://img.autotrader.co.za/40310764/Fit508x373'),
(1, 'https://img.autotrader.co.za/40310773/Fit508x373'),

(2, 'https://img.autotrader.co.za/22527/Crop676x507'),
(2, 'https://img.autotrader.co.za/22528/Crop676x507'),
(2, 'https://img.autotrader.co.za/22529/Crop676x507'),
(2, 'hhttps://img.autotrader.co.za/22530/Crop676x507'),

(3, 'https://img.autotrader.co.za/38401458'),
(3, 'https://img.autotrader.co.za/38401455/Fit508x373'),
(3, 'https://img.autotrader.co.za/38401456/Fit508x373'),
(3, 'https://img.autotrader.co.za/38401460/Fit508x373'),

(4, 'https://img.autotrader.co.za/40331975'),
(4, 'https://img.autotrader.co.za/40331978/Fit508x373'),
(4, 'https://img.autotrader.co.za/40331981/Fit508x373'),
(4, 'https://img.autotrader.co.za/40331982/Fit508x373'),

(5, 'https://img.autotrader.co.za/37351643'),
(5, 'https://img.autotrader.co.za/37351633/Fit508x373'),
(5, 'https://img.autotrader.co.za/37351642/Fit508x373'),
(5, 'https://img.autotrader.co.za/37351631/Fit508x373'),

(6, 'https://img.autotrader.co.za/40327663'),
(6, 'https://img.autotrader.co.za/40332368/Fit508x373'),
(6, 'https://img.autotrader.co.za/40332369/Fit508x373'),
(6, 'https://img.autotrader.co.za/40327675/Fit508x373'),

(7, 'https://img.autotrader.co.za/38629677'),
(7, 'https://img.autotrader.co.za/38629678/Fit508x373'),
(7, 'https://img.autotrader.co.za/38629676/Fit508x373'),
(7, 'https://img.autotrader.co.za/38629679/Fit508x373'),

(8, 'https://img.autotrader.co.za/40275198'),
(8, 'https://img.autotrader.co.za/40275192/Fit508x373'),
(8, 'https://img.autotrader.co.za/40275182/Fit508x373'),
(8, 'https://img.autotrader.co.za/40275197/Fit508x373'),

(9, 'https://img.autotrader.co.za/39995079'),
(9, 'https://img.autotrader.co.za/39995080/Fit508x373'),
(9, 'https://img.autotrader.co.za/39995082/Fit508x373'),
(9, 'https://img.autotrader.co.za/39995085/Fit508x373'),

(10, 'https://img.autotrader.co.za/40080081'),
(10, 'https://img.autotrader.co.za/40080113/Fit508x373'),
(10, 'https://img.autotrader.co.za/40080093/Fit508x373'),
(10, 'https://img.autotrader.co.za/40080107/Fit508x373'),

(11, 'https://img.autotrader.co.za/40332462'),
(11, 'https://img.autotrader.co.za/40332461/Fit508x373'),
(11, 'https://img.autotrader.co.za/40332471/Fit508x373'),
(11, 'https://img.autotrader.co.za/40332468/Fit508x373'),

(12, 'https://img.autotrader.co.za/36573290'),
(12, 'https://img.autotrader.co.za/36573291/Fit508x373'),
(12, 'https://img.autotrader.co.za/36573294/Fit508x373'),
(12, 'https://img.autotrader.co.za/36573293/Fit508x373');