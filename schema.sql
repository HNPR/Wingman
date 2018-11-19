CREATE DATABASE wingman_db;

USE wingman_db;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  fullname VARCHAR(100) NOT NULL,
  age TINYINT,
  gender TINYINT,
  googleID VARCHAR(100) NOT NULL,
  emailAddress VARCHAR(255),
  profilePhoto VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE walk (
    id INT NOT NULL AUTO_INCREMENT,
    walkerId INT,
    volunteerId INT,
    startLocation VARCHAR(255) NOT NULL,
    endLocation VARCHAR(255) NOT NULL,
    startTime DATETIME
    completed BOOLEAN NOT NULL
)