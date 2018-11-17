CREATE DATABASE wingman_db;

USE wingman_db;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  fullname VARCHAR(100) NOT NULL,
  age INT NULL,
  gender TINYINT,
  googleID VARCHAR(100) NULL,
  emailAddress VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE walks (
    id INT NOT NULL AUTO_INCREMENT,
    walkerId INT NOT NULL,
    volunteerId INT NOT NULL,
    startLocation VARCHAR(255) NOT NULL,
    endLocation VARCHAR(255) NOT NULL,
    startTime DATETIME
)