-- 1. Mostrar todas las cuentas
SELECT * FROM account;

-- 2. Eliminar a Tony Stark
DELETE FROM account
WHERE account_email = 'tony@stark.com';

-- 3. Convertir a Bruce Banner en Admin
UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'bruce@banner.com';

-- 4. Vehículos de la clasificación Sport
SELECT inv.inv_make, inv.inv_model, c.classification_name
FROM inventory inv
INNER JOIN classification c
  ON inv.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- 5. Buscar vehículos con la letra "a" en la descripción
SELECT inv_make, inv_model, inv_description
FROM inventory
WHERE inv_description ILIKE '%a%';

-- 6. Insertar un nuevo vehículo (Cybertruck)
INSERT INTO inventory 
(inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_stock, inv_color, classification_id)
VALUES 
('Tesla', 'Cybertruck', 'A futuristic electric truck', '/images/vehicles/cybertruck.jpg', '/images/vehicles/cybertruck-tn.jpg', 62000, 5, 'Silver', 3);

