-- Replace database_title with a title of your choosing --
-- Drops the database_title if it exists currently --
DROP DATABASE IF EXISTS leaderboard_db;
-- Creates the "leaderboard_db" database --
CREATE DATABASE leaderboard_db;
-- Allows the "leaderboard_db" database to be modified --
USE leaderboard_db;

-- Replace placeholder names with desired labels --
CREATE TABLE scores(
    id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(100) NOT NULL,
    round INT default 0,
    score INT NULL,
    PRIMARY KEY (id)
);

-- Displays table_1 in the database shell --
SELECT * FROM scores;