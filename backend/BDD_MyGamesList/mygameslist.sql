-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-02-2025 a las 19:39:12
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mygameslist`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listas`
--

CREATE TABLE `listas` (
  `id_lista` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nombre_lista` varchar(100) NOT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `listas`
--

INSERT INTO `listas` (`id_lista`, `id_usuario`, `nombre_lista`, `fecha_creacion`) VALUES
(67, 2, 'From software', '2025-02-22 11:11:59'),
(75, 17, 'Kingdom hearts', '2025-02-22 19:26:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista_videojuegos`
--

CREATE TABLE `lista_videojuegos` (
  `id_juego` int(11) NOT NULL,
  `id_lista` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `image` varchar(500) NOT NULL,
  `link_juego` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lista_videojuegos`
--

INSERT INTO `lista_videojuegos` (`id_juego`, `id_lista`, `titulo`, `image`, `link_juego`) VALUES
(36, 67, 'Dark Souls III', 'https://media.rawg.io/media/games/da1/da1b267764d77221f07a4386b6548e5a.jpg', '/pagGame/infoGame.html?id=2551'),
(38, 67, 'Elden Ring', 'https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg', '/pagGame/infoGame.html?id=326243'),
(39, 67, 'Borderlands 2', 'https://media.rawg.io/media/games/49c/49c3dfa4ce2f6f140cc4825868e858cb.jpg', '/pagGame/infoGame.html?id=802'),
(40, 75, 'KINGDOM HEARTS HD 1.5 +2.5 ReMIX', 'https://media.rawg.io/media/games/c97/c970331a996c14ff50077bd00f9fd3b1.jpg', '/pagGame/infoGame.html?id=69'),
(41, 75, 'KINGDOM HEARTS Re:coded', 'https://media.rawg.io/media/games/65f/65f4371671478eff172fad8d60653a66.jpg', '/pagGame/infoGame.html?id=24329'),
(42, 75, 'Kingdom Hearts III', 'https://media.rawg.io/media/games/968/968e6210715fd61237139e3caa193be0.jpg', '/pagGame/infoGame.html?id=51324'),
(43, 75, 'Kingdom Hearts HD 2.8 Final Chapter Prologue', 'https://media.rawg.io/media/games/531/5310bfdd3240f2c037eebaa75c04c44e.jpg', '/pagGame/infoGame.html?id=472');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` timestamp NOT NULL DEFAULT (current_timestamp() + interval 1 hour)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `password_resets`
--

INSERT INTO `password_resets` (`id`, `email`, `token`, `created_at`, `expires_at`) VALUES
(5, 'josemab26@gmail.com', '16bf8ed32af849e57a98303bb749f4c4', '2025-02-10 14:12:20', '2025-02-10 15:12:20'),
(6, 'josemab26@gmail.com', '43ab2e15e5f583ab57d8005fc800067d', '2025-02-10 14:12:40', '2025-02-10 15:12:40'),
(7, 'jillben391@gmail.com', 'e7b9d76d4f700848eb1180e8770ce440', '2025-02-10 14:14:27', '2025-02-10 15:14:27'),
(8, 'jillben391@gmail.com', 'e11025c7f757f183c666c50f2e50b75f', '2025-02-10 14:15:28', '2025-02-10 15:15:28'),
(9, 'jillben391@gmail.com', '6dbb4ae1ec01802e9f706059fa799387', '2025-02-10 14:18:13', '2025-02-10 15:18:13'),
(10, 'jillben391@gmail.com', '19a6dc48a06ee05dadcb5271be94f951', '2025-02-10 14:19:23', '2025-02-10 15:19:23'),
(11, 'jillben391@gmail.com', 'de766525271938c300e3de801cb21c2a', '2025-02-10 14:20:49', '2025-02-10 15:20:49'),
(12, 'jillben391@gmail.com', '481dc3d595fc244ed91cbbebdfafddab', '2025-02-10 14:23:09', '2025-02-10 15:23:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `relaciones`
--

CREATE TABLE `relaciones` (
  `id_seguimiento` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_seguidor` int(11) NOT NULL,
  `fecha_seguimiento` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `relaciones`
--

INSERT INTO `relaciones` (`id_seguimiento`, `id_usuario`, `id_seguidor`, `fecha_seguimiento`) VALUES
(27, 16, 2, '2025-02-22 19:24:10'),
(28, 17, 2, '2025-02-22 19:26:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resenas`
--

CREATE TABLE `resenas` (
  `id_resena` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `img_juego` varchar(255) DEFAULT NULL,
  `id_videojuego_api` varchar(100) NOT NULL,
  `contenido` text NOT NULL,
  `fecha_publicacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resenas`
--

INSERT INTO `resenas` (`id_resena`, `id_usuario`, `img_juego`, `id_videojuego_api`, `contenido`, `fecha_publicacion`) VALUES
(56, 17, 'https://media.rawg.io/media/games/c97/c970331a996c14ff50077bd00f9fd3b1.jpg', '69', 'Goood i love you ❤❤❤', '2025-02-22 19:37:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`, `descripcion`) VALUES
(1, 'Usuario', 'Rol con acceso limitado a la plataforma.'),
(2, 'Administrador', 'Rol con acceso a la administración, pero con menos privilegios que el Jefe.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `fecha_registro` datetime DEFAULT current_timestamp(),
  `avatar` varchar(255) DEFAULT NULL,
  `id_rol` int(11) NOT NULL,
  `metodo_registro` enum('google','manual') DEFAULT 'manual',
  `sobremi` text DEFAULT NULL,
  `steam` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  `discord` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `email`, `contrasena`, `fecha_registro`, `avatar`, `id_rol`, `metodo_registro`, `sobremi`, `steam`, `youtube`, `discord`) VALUES
(2, 'JosemaElMolon', 'josemab26@gmail.com', NULL, '2025-02-11 23:18:41', 'http://localhost:5500/img/avatares/Yoshi.jpg', 2, 'google', 'Soy alguien que valora la autenticidad y las conexiones genuinas. Me apasiona explorar nuevas ideas, aprender cosas diferentes y crecer en todos los aspectos de mi vida. Disfruto de los pequeños detalles, como una buena conversación, la música que inspira y la naturaleza que calma. Creo que cada día ofrece una nueva oportunidad para aprender algo valioso y seguir persiguiendo mis sueños, sin dejar de lado la importancia de ser agradecido y mantener una mentalidad positiva', 'https://steamcommunity.com/profiles/76561198319232792/', 'https://www.youtube.com/@josemab8832', 'TonyElMolon#1230'),
(16, 'Jose_google_', 'jmabenavides25@gmail.com', NULL, '2025-02-22 10:29:10', 'https://lh3.googleusercontent.com/a/ACg8ocKS9nob_abJ5OtAC_mjBo_1tzv-EkpS5uDA_M9KjlpbwMOl-ls=s96-c', 1, 'google', NULL, NULL, NULL, NULL),
(17, 'Jillben_google_', 'jillben391@gmail.com', NULL, '2025-02-22 10:29:19', 'https://lh3.googleusercontent.com/a/ACg8ocL2zgo6_QQpliFK8s6FQcQ0LK9fi0_gu7kQFPJPHsqPjgUnaaM=s96-c', 2, 'google', NULL, NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `listas`
--
ALTER TABLE `listas`
  ADD PRIMARY KEY (`id_lista`),
  ADD KEY `fk_id_usuario` (`id_usuario`);

--
-- Indices de la tabla `lista_videojuegos`
--
ALTER TABLE `lista_videojuegos`
  ADD PRIMARY KEY (`id_juego`),
  ADD KEY `id_lista` (`id_lista`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Indices de la tabla `relaciones`
--
ALTER TABLE `relaciones`
  ADD PRIMARY KEY (`id_seguimiento`),
  ADD UNIQUE KEY `unique_follow` (`id_usuario`,`id_seguidor`),
  ADD KEY `id_seguidor` (`id_seguidor`);

--
-- Indices de la tabla `resenas`
--
ALTER TABLE `resenas`
  ADD PRIMARY KEY (`id_resena`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `listas`
--
ALTER TABLE `listas`
  MODIFY `id_lista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de la tabla `lista_videojuegos`
--
ALTER TABLE `lista_videojuegos`
  MODIFY `id_juego` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `relaciones`
--
ALTER TABLE `relaciones`
  MODIFY `id_seguimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `resenas`
--
ALTER TABLE `resenas`
  MODIFY `id_resena` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `listas`
--
ALTER TABLE `listas`
  ADD CONSTRAINT `fk_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `listas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `lista_videojuegos`
--
ALTER TABLE `lista_videojuegos`
  ADD CONSTRAINT `lista_videojuegos_ibfk_1` FOREIGN KEY (`id_lista`) REFERENCES `listas` (`id_lista`) ON DELETE CASCADE;

--
-- Filtros para la tabla `relaciones`
--
ALTER TABLE `relaciones`
  ADD CONSTRAINT `relaciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `relaciones_ibfk_2` FOREIGN KEY (`id_seguidor`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `resenas`
--
ALTER TABLE `resenas`
  ADD CONSTRAINT `resenas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_id_rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
