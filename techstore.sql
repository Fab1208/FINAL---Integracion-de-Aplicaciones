-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `techstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Computadoras2', 'Esta categoría incluye laptops, desktops, workstations y all-in-one. Se pueden encontrar equipos para diversos usos, como trabajo, estudio, entretenimiento y videojuegos.'),
(2, 'Teléfonos móviles', 'Esta categoría incluye smartphones de diversas marcas, modelos y precios. Se pueden encontrar equipos con diferentes características, como sistema operativo, pantalla, cámara, procesador, memoria RAM y almacenamiento.'),
(3, 'Tabletas', 'Esta categoría incluye tablets de diversas marcas, modelos y tamaños. Se pueden encontrar equipos para diversos usos, como consumo de contenido multimedia, lectura, juegos y tareas de productividad.'),
(4, 'Accesorios', 'Esta categoría incluye una amplia variedad de accesorios para computadoras, teléfonos móviles y tabletas. Se pueden encontrar cargadores, fundas, audífonos, teclados, memorias USB, etc.'),
(5, 'Audio y video', 'Esta categoría incluye televisores, equipos de sonido, bocinas, barras de sonido, audífonos y otros dispositivos de audio y video.');

-- --------------------------------------------------------

--
-- Table structure for table `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cliente`
--

INSERT INTO `cliente` (`id`, `nombre`, `email`, `telefono`, `direccion`) VALUES
(1, 'Juan Pérez', 'juan.perez@correo.com', '987654321', 'Av. Larco 123, Miraflores, Lima'),
(2, 'María García', 'maria.garcia@correo.com', '954321098', 'Calle Libertad 456, San Isidro, Lima'),
(3, 'Pedro López', 'pedro.lopez@correo.com', '963210543', 'Jr. Ica 789, Surquillo, Lima'),
(4, 'Ana Castro', 'ana.castro@correo.com', '921034567', 'Av. Arequipa 135, Jesús María, Lima'),
(5, 'Carlos Mendoza', 'carlos.mendoza@correo.com', '976543210', 'Urb. Los Cedros 234, La Molina, Lima');

-- --------------------------------------------------------

--
-- Table structure for table `detallesOrden`
--

CREATE TABLE `detallesOrden` (
  `id` int(11) NOT NULL,
  `orden_id` int(11) DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detallesOrden`
--

INSERT INTO `detallesOrden` (`id`, `orden_id`, `producto_id`, `cantidad`) VALUES
(1, 1, 1, 1),
(2, 1, 4, 2),
(3, 1, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orden`
--

CREATE TABLE `orden` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orden`
--

INSERT INTO `orden` (`id`, `cliente_id`, `total`, `estado`) VALUES
(1, 2, 3999.96, 'PENDIENTE');

-- --------------------------------------------------------

--
-- Table structure for table `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `categoria_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `categoria_id`) VALUES
(1, 'Laptop Gamer Nitro 5 AN515-57-575Q', 'Potente laptop gamer con procesador Intel Core i5-11400H, tarjeta gráfica NVIDIA GeForce RTX 3050, 8GB de memoria RAM y 512GB de almacenamiento SSD.', 2999.99, 10, 1),
(2, 'Smartphone Samsung Galaxy S22 Ultra', 'Smartphone de alta gama con pantalla Dynamic AMOLED 2X de 6.8 pulgadas, procesador Snapdragon 8 Gen 1, 12GB de memoria RAM y 256GB de almacenamiento.', 1199.99, 15, 2),
(3, 'Tablet iPad Air 5ª generación', 'Tablet con chip M1, pantalla Liquid Retina de 10.9 pulgadas, 8GB de memoria RAM y 256GB de almacenamiento.', 599.99, 8, 3),
(4, 'Cargador inalámbrico MagSafe para iPhone', 'Cargador inalámbrico rápido y seguro para iPhone 12 y posteriores.', 49.99, 20, 4),
(5, 'Smart TV Sony Bravia X80K 4K HDR', 'Smart TV 4K HDR con pantalla LED de 55 pulgadas, procesador Cognitive Processor XR y sistema operativo Google TV.', 899.99, 5, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detallesOrden`
--
ALTER TABLE `detallesOrden`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orden_id` (`orden_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indexes for table `orden`
--
ALTER TABLE `orden`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- Indexes for table `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `detallesOrden`
--
ALTER TABLE `detallesOrden`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orden`
--
ALTER TABLE `orden`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detallesOrden`
--
ALTER TABLE `detallesOrden`
  ADD CONSTRAINT `detallesOrden_ibfk_1` FOREIGN KEY (`orden_id`) REFERENCES `orden` (`id`),
  ADD CONSTRAINT `detallesOrden_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`);

--
-- Constraints for table `orden`
--
ALTER TABLE `orden`
  ADD CONSTRAINT `orden_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`);

--
-- Constraints for table `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
