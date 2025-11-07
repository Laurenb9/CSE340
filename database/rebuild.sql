-- rebuild.sql
-- Script para reconstruir la base de datos del curso (Task 2)
-- Ejecutar TODO junto en pgAdmin Query Tool para recrear DB.
-- --- Borra tipos y tablas si existen (para que el script sea idempotente)
DROP TYPE IF EXISTS account_type CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS account CASCADE;
DROP TABLE IF EXISTS classification CASCADE;

--1) Crear el TYPE account_type (user-defined enum)
CREATE TYPE account_type AS ENUM ('Client', 'Admin');

--2) Crear tabla classification
CREATE TABLE classification (
  classification_id SERIAL PRIMARY KEY,
  classification_name VARCHAR(50) NOT NULL UNIQUE
);

--3) Crear tabla inventory
CREATE TABLE inventory (
  inv_id SERIAL PRIMARY KEY,
  inv_make VARCHAR(50) NOT NULL,
  inv_model VARCHAR(50) NOT NULL,
  inv_description TEXT NOT NULL,
  inv_image VARCHAR(255),
  inv_thumbnail VARCHAR(255),
  inv_price NUMERIC(12,2) DEFAULT 0.00,
  inv_stock INT NOT NULL DEFAULT 0,
  inv_color VARCHAR(50),
  classification_id INT REFERENCES classification(classification_id)
);

--4) Crear tabla account
CREATE TABLE account (
  account_id SERIAL PRIMARY KEY,
  account_firstname VARCHAR(50) NOT NULL,
  account_lastname VARCHAR(50) NOT NULL,
  account_email VARCHAR(100) NOT NULL UNIQUE,
  account_password VARCHAR(200) NOT NULL,
  account_type account_type DEFAULT 'Client'
);

--5) Poblar tabla classification
INSERT INTO classification (classification_name)
VALUES
  ('Sport'),
  ('SUV'),
  ('Truck'),
  ('Classic'),
  ('Luxury');

--6) Poblar tabla inventory (ejemplos)
-- Sport=1, SUV=2, Truck=3, Classic=4, Luxury=5
INSERT INTO inventory (inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_stock, inv_color, classification_id)
VALUES
('GM', 'Hummer', 'big, powerful truck with small interiors', '/images/hummer.jpg', '/images/hummer-tn.jpg', 50000.00, 5, 'Black', 3),
('Ford', 'Mustang', 'Sport muscle car with amazing performance', '/images/mustang.jpg', '/images/mustang-tn.jpg', 35000.00, 7, 'Red', 1),
('Toyota', 'Supra', 'Sport car known for speed and style', '/images/supra.jpg', '/images/supra-tn.jpg', 45000.00, 6, 'White', 1),
('Chevrolet', 'Silverado', 'Large pickup truck for work and play', '/images/silverado.jpg', '/images/silverado-tn.jpg', 42000.00, 4, 'Blue', 3),
('Chevrolet', 'Camaro', 'Powerful sports muscle car', '/images/chevy-camaro.jpg', '/images/chevy-camaro-tn.jpg', 50000.00, 2, 'Yellow', 1),
('Toyota', 'RAV4', 'A popular and comfortable SUV', '/images/toyota-rav4.jpg', '/images/toyota-rav4-tn.jpg', 38000.00, 8, 'Blue', 2);

-- IMPORTANT: Las dos consultas a continuación (Query 4 y Query 6 del Task 1)

-- Query 4: Reemplazar "small interiors" por "a huge interior" en Hummer
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Query 6: Actualizar rutas de imágenes para incluir '/vehicles'
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');

-- FIN del script de reconstrucción
