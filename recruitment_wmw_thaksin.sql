-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2024 at 04:37 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recruitment_wmw_thaksin`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` char(2) NOT NULL,
  `admin_user` varchar(30) NOT NULL,
  `admin_password` varchar(255) NOT NULL,
  `admin_Fname` varchar(25) NOT NULL,
  `admin_Lname` varchar(25) NOT NULL,
  `admin_image` varchar(100) DEFAULT NULL,
  `admin_tel` char(10) NOT NULL,
  `admin_email` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `admin_user`, `admin_password`, `admin_Fname`, `admin_Lname`, `admin_image`, `admin_tel`, `admin_email`, `created_at`, `updated_at`) VALUES
('01', 'warawut_TD', '25d55ad283aa400af464c76d713c07ad', 'warawut', 'ninrat', 'image1', '0973099633', 'warawut@gmail.com', '2024-07-16 03:30:13', '2024-07-16 03:30:13'),
('02', 'disaya', 'e10adc3949ba59abbe56e057f20f883e', 'Ditsaya', 'Khongdee', 'image2', '0973078888', 'Disaya@gmail.com', '2024-07-16 06:32:32', '2024-07-16 06:32:32');

-- --------------------------------------------------------

--
-- Table structure for table `users_iogin`
--

CREATE TABLE `users_iogin` (
  `id` int(11) NOT NULL,
  `U_id` char(3) NOT NULL,
  `UserName` varchar(40) NOT NULL,
  `User_Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_iogin`
--

INSERT INTO `users_iogin` (`id`, `U_id`, `UserName`, `User_Password`) VALUES
(1, '001', 'warawut_td', '25d55ad283aa400af464c76d713c07ad'),
(2, '002', 'Ditsaya', '25d55ad283aa400af464c76d713c07ad');

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `address_id` int(11) NOT NULL,
  `U_id` char(3) NOT NULL,
  `house_num` varchar(10) NOT NULL,
  `villageNum` varchar(2) NOT NULL,
  `alley` varchar(30) NOT NULL,
  `street` varchar(30) NOT NULL,
  `sub_district` varchar(30) NOT NULL,
  `district` varchar(30) NOT NULL,
  `province` varchar(40) NOT NULL,
  `postal_code` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_address`
--

INSERT INTO `user_address` (`address_id`, `U_id`, `house_num`, `villageNum`, `alley`, `street`, `sub_district`, `district`, `province`, `postal_code`) VALUES
(1, '001', '1/69', '5', 'จัดสรร', 'ราชดำเนิน', 'ในเมือง', 'เมือง', 'นครศรีธรรมราช', '80000'),
(5, '002', '1/777', '3', '-', 'ราชดำเนิน', 'ชะอวด', 'ชะอวด', 'นครศรีธรรมราช', '89000');

-- --------------------------------------------------------

--
-- Table structure for table `user_parents`
--

CREATE TABLE `user_parents` (
  `parent_id` int(11) NOT NULL,
  `U_id` char(3) NOT NULL,
  `father_Fname` varchar(25) NOT NULL,
  `father_Lname` varchar(25) NOT NULL,
  `father_Occupation` varchar(40) DEFAULT NULL,
  `mother_Fname` varchar(25) NOT NULL,
  `mother_Lname` varchar(25) NOT NULL,
  `mother_Occupation` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_parents`
--

INSERT INTO `user_parents` (`parent_id`, `U_id`, `father_Fname`, `father_Lname`, `father_Occupation`, `mother_Fname`, `mother_Lname`, `mother_Occupation`) VALUES
(1, '001', 'Witter', 'Ninrat', 'policeman', 'porn', 'Ninrat', 'trading career'),
(3, '002', 'ประสิทธิ', 'ดีดี', 'policeman', 'สุขใจ', 'ดีดี', 'trading career');

-- --------------------------------------------------------

--
-- Table structure for table `user_personal`
--

CREATE TABLE `user_personal` (
  `User_id` char(3) NOT NULL,
  `User_Fname` varchar(30) NOT NULL,
  `User_Lname` varchar(30) NOT NULL,
  `User_gender` varchar(10) NOT NULL,
  `User_Date_Birth` date DEFAULT NULL,
  `User_age` int(11) NOT NULL,
  `User_dmc_Province` varchar(25) NOT NULL,
  `User_Religion` varchar(20) NOT NULL,
  `User_Blood_Type` varchar(2) NOT NULL,
  `User_Marital_Status` varchar(10) NOT NULL,
  `User_child` int(1) NOT NULL,
  `User_Military_Status` varchar(40) DEFAULT NULL,
  `User_phone_num` char(10) NOT NULL,
  `User_email` varchar(70) NOT NULL,
  `User_Image` varchar(120) DEFAULT NULL,
  `User_file` varchar(120) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Update_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_personal`
--

INSERT INTO `user_personal` (`User_id`, `User_Fname`, `User_Lname`, `User_gender`, `User_Date_Birth`, `User_age`, `User_dmc_Province`, `User_Religion`, `User_Blood_Type`, `User_Marital_Status`, `User_child`, `User_Military_Status`, `User_phone_num`, `User_email`, `User_Image`, `User_file`, `created_at`, `Update_at`) VALUES
('001', 'warawut', 'ninrat', 'man', '2003-10-25', 22, 'nakorn', 'Buddhist', 'AB', 'single', 1, 'No', '0973099633', 'warawut100@gmail.com', 'image1', 'file1', '2024-07-16 11:09:00', '2024-07-17 02:34:49'),
('002', 'Disaya', 'KongDee', 'girl', '2003-12-06', 21, 'nakorn', 'Buddhist', 'B', 'single', 1, 'No', '0973088633', 'Disaya@gmail.com', 'image2', 'file2', '2024-07-17 02:38:20', '2024-07-17 02:38:20');

-- --------------------------------------------------------

--
-- Table structure for table `user_workplace_now`
--

CREATE TABLE `user_workplace_now` (
  `WP_id` int(11) NOT NULL,
  `U_id` char(3) NOT NULL,
  `Office_Name` varchar(50) NOT NULL,
  `Job_position` varchar(30) NOT NULL,
  `Salary` int(11) NOT NULL,
  `Office_address` varchar(10) NOT NULL,
  `Office_villageNum` varchar(5) NOT NULL,
  `Office_alley` varchar(30) NOT NULL,
  `Office_street` varchar(40) NOT NULL,
  `Office_sub_district` varchar(40) NOT NULL,
  `Office_district` varchar(35) NOT NULL,
  `Office_province` varchar(40) NOT NULL,
  `Office_phone` char(10) NOT NULL,
  `Office_fax` char(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_workplace_now`
--

INSERT INTO `user_workplace_now` (`WP_id`, `U_id`, `Office_Name`, `Job_position`, `Salary`, `Office_address`, `Office_villageNum`, `Office_alley`, `Office_street`, `Office_sub_district`, `Office_district`, `Office_province`, `Office_phone`, `Office_fax`) VALUES
(1, '001', 'Tikkok', 'programming', 80000, '999', '7', 'ซอยรังสิต', 'ถนนราชดำเนิน', 'เมือง', 'รังสิต', 'กรุงเทพ', '0878778899', '021586699'),
(3, '002', 'Google', 'data analysis', 50000, '779', '9', 'ซอยใหม่', 'ถนนราชดำเนิน', 'เมือง', 'จตุจักร', 'กรุงเทพ', '0878998522', '021704444');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `users_iogin`
--
ALTER TABLE `users_iogin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`address_id`);

--
-- Indexes for table `user_parents`
--
ALTER TABLE `user_parents`
  ADD PRIMARY KEY (`parent_id`);

--
-- Indexes for table `user_personal`
--
ALTER TABLE `user_personal`
  ADD PRIMARY KEY (`User_id`);

--
-- Indexes for table `user_workplace_now`
--
ALTER TABLE `user_workplace_now`
  ADD PRIMARY KEY (`WP_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users_iogin`
--
ALTER TABLE `users_iogin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_address`
--
ALTER TABLE `user_address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_parents`
--
ALTER TABLE `user_parents`
  MODIFY `parent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_workplace_now`
--
ALTER TABLE `user_workplace_now`
  MODIFY `WP_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
