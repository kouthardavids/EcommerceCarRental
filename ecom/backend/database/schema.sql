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
    password TEXT NOT NULL,
    phone_number VARCHAR(15)
);

CREATE TABLE vehicles (
  car_id INT PRIMARY KEY AUTO_INCREMENT,
  model_name VARCHAR(100) NOT NULL,
  brand VARCHAR(100),
  year INT,
  seats INT,
  color VARCHAR(50),
  image_url TEXT,
  description TEXT,
  rental_price_per_day DECIMAL(10, 2),
  number_plate VARCHAR(20) UNIQUE NOT NULL ,
  is_available BOOLEAN DEFAULT TRUE
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

-- available on for each car
-- each add on has a specific amount
CREATE TABLE addons (
  addon_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL
);

-- addons linked to the vehicle table and the type of addons in the addons table
CREATE TABLE vehicle_addons (
  vehicle_id INT,
  addon_id INT,
  PRIMARY KEY (vehicle_id, addon_id),
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(car_id),
  FOREIGN KEY (addon_id) REFERENCES addons(addon_id)
);

-- booking of each user, which is connected to the bookings table and the addons table
CREATE TABLE booking_addons (
  booking_id INT,
  addon_id INT,
  PRIMARY KEY (booking_id, addon_id),
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id),
  FOREIGN KEY (addon_id) REFERENCES addons(addon_id)
);

CREATE TABLE cart (
  cart_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  car_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (car_id) REFERENCES vehicles(car_id)
);

CREATE TABLE cart_addons (
  cart_id INT NOT NULL,
  addon_id INT NOT NULL,
  PRIMARY KEY (cart_id, addon_id),
  FOREIGN KEY (cart_id) REFERENCES cart(cart_id),
  FOREIGN KEY (addon_id) REFERENCES addons(addon_id)
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