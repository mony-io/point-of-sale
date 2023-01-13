-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 13, 2023 at 09:30 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_contruction`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblBrands`
--

CREATE TABLE `tblBrands` (
  `id` int(11) NOT NULL,
  `brandName` varchar(200) NOT NULL,
  `desc` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblBrands`
--

INSERT INTO `tblBrands` (`id`, `brandName`, `desc`) VALUES
(2, 'ABCD', 'Great'),
(3, 'ABC', 'Great'),
(4, 'gg', '');

-- --------------------------------------------------------

--
-- Table structure for table `tblCategories`
--

CREATE TABLE `tblCategories` (
  `id` int(11) NOT NULL,
  `categoryName` varchar(250) NOT NULL,
  `desc` varchar(250) NOT NULL,
  `photo` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblCategories`
--

INSERT INTO `tblCategories` (`id`, `categoryName`, `desc`, `photo`) VALUES
(1, 'Beer', 'Cambodia beer', ''),
(2, 'Juice', 'Thailand', 'images/1672242826321kali-linux-kali-linux-nethunter-linux-wallpaper-preview.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tblCustomers`
--

CREATE TABLE `tblCustomers` (
  `customer_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `address` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tblProducts`
--

CREATE TABLE `tblProducts` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `product_code` varchar(100) NOT NULL,
  `product_name` varchar(200) NOT NULL,
  `qty` int(11) NOT NULL,
  `unit_in_stock` float NOT NULL,
  `retail_price` float NOT NULL,
  `wholesale_price` float NOT NULL,
  `tax` float NOT NULL,
  `exp_date` date NOT NULL,
  `product_image` varchar(200) NOT NULL,
  `desc` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tblProductUnits`
--

CREATE TABLE `tblProductUnits` (
  `id` int(11) NOT NULL,
  `unit` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblProductUnits`
--

INSERT INTO `tblProductUnits` (`id`, `unit`) VALUES
(2, 'km'),
(3, 'mm');

-- --------------------------------------------------------

--
-- Table structure for table `tblSaleDetails`
--

CREATE TABLE `tblSaleDetails` (
  `sale_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty_sales` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tblSales`
--

CREATE TABLE `tblSales` (
  `sale_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `sale_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tblSupplies`
--

CREATE TABLE `tblSupplies` (
  `id` int(11) NOT NULL,
  `supName` varchar(250) NOT NULL,
  `companyName` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `address` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblBrands`
--
ALTER TABLE `tblBrands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblCategories`
--
ALTER TABLE `tblCategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblCustomers`
--
ALTER TABLE `tblCustomers`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `tblProducts`
--
ALTER TABLE `tblProducts`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `tblProductUnits`
--
ALTER TABLE `tblProductUnits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblSales`
--
ALTER TABLE `tblSales`
  ADD PRIMARY KEY (`sale_id`);

--
-- Indexes for table `tblSupplies`
--
ALTER TABLE `tblSupplies`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblBrands`
--
ALTER TABLE `tblBrands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tblCategories`
--
ALTER TABLE `tblCategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tblCustomers`
--
ALTER TABLE `tblCustomers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblProducts`
--
ALTER TABLE `tblProducts`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblProductUnits`
--
ALTER TABLE `tblProductUnits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tblSales`
--
ALTER TABLE `tblSales`
  MODIFY `sale_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblSupplies`
--
ALTER TABLE `tblSupplies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
