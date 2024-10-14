-- Crear la tabla Administrador si no existe
CREATE TABLE IF NOT EXISTS Administrador (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    nombre TEXT NOT NULL,
    contrasena TEXT
);

-- Crear un índice en el campo id
CREATE INDEX IF NOT EXISTS index_id ON Administrador (id);

-- Insertar un registro inicial si no existe ya un administrador con nombre 'admin'
INSERT INTO Administrador (nombre, contrasena)
SELECT 'admin', '12345678'
WHERE NOT EXISTS (
    SELECT 1 FROM Administrador WHERE nombre = 'admin'
);