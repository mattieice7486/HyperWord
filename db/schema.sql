-- Replace database_title with a title of your choosing --
-- Drops the database_title if it exists currently --
DROP DATABASE IF EXISTS database_title;
-- Creates the "database_title" database --
CREATE DATABASE database_title;
-- Allows the "database_title" database to be modified --
USE database_title;

-- Replace placeholder names with desired labels --
CREATE TABLE table_1(
    id INT NOT NULL AUTO_INCREMENT,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(45) NOT NULL,
    integer_1 INT default 0,
    price DECIMAL(10,2) NULL,
    quantity INT NULL,
    PRIMARY KEY (id)
);

-- Displays table_1 in the database shell --
SELECT * FROM table_1;